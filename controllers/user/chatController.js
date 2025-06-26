const Chat = require('../../models/Chat');
const User = require('../../models/User');

// Get all chats for current user
exports.getUserChats = async (req, res) => {
    try {
        const chats = await Chat.find({
            participants: req.user.id
        })
        .populate('participants', 'name profilePicture role')
        .populate('lastMessage.sender', 'name')
        .sort({ 'lastMessage.timestamp': -1 });

        res.status(200).json(chats);
    } catch (error) {
        console.error('Error fetching user chats:', error);
        res.status(500).json({ message: 'Error fetching chats' });
    }
};

// Get chat by ID
exports.getChatById = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId)
            .populate('participants', 'name profilePicture role')
            .populate('messages.sender', 'name profilePicture role');

        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Check if user is participant in this chat
        if (!chat.participants.some(p => p._id.toString() === req.user.id)) {
            return res.status(403).json({ message: 'Not authorized to access this chat' });
        }

        // Mark all unread messages as read
        if (chat.messages && chat.messages.length > 0) {
            chat.messages.forEach(message => {
                if (!message.isRead && message.sender._id.toString() !== req.user.id) {
                    message.isRead = true;
                }
            });

            if (chat.lastMessage && !chat.lastMessage.isRead && 
                chat.lastMessage.sender.toString() !== req.user.id) {
                chat.lastMessage.isRead = true;
            }

            await chat.save();
        }

        res.status(200).json(chat);
    } catch (error) {
        console.error('Error fetching chat:', error);
        res.status(500).json({ message: 'Error fetching chat details' });
    }
};

// Create new chat or get existing chat
exports.createOrGetChat = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ message: 'User ID is required' });
        }

        // Check if user exists
        const otherUser = await User.findById(userId);
        if (!otherUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if chat already exists between these users
        let chat = await Chat.findOne({
            participants: { $all: [req.user.id, userId] }
        })
        .populate('participants', 'name profilePicture role')
        .populate('messages.sender', 'name profilePicture role');

        // If chat exists, return it
        if (chat) {
            return res.status(200).json(chat);
        }

        // Create new chat
        chat = new Chat({
            participants: [req.user.id, userId],
            messages: []
        });

        await chat.save();

        // Populate participant details
        chat = await Chat.findById(chat._id)
            .populate('participants', 'name profilePicture role');

        res.status(201).json(chat);
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({ message: 'Error creating chat' });
    }
};

// Send message
exports.sendMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ message: 'Message content is required' });
        }

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ message: 'Chat not found' });
        }

        // Check if user is participant in this chat
        if (!chat.participants.includes(req.user.id)) {
            return res.status(403).json({ message: 'Not authorized to send message in this chat' });
        }

        // Add new message
        const newMessage = {
            sender: req.user.id,
            content,
            timestamp: new Date(),
            isRead: false
        };

        chat.messages.push(newMessage);
        
        // Update last message
        chat.lastMessage = {
            content,
            sender: req.user.id,
            timestamp: new Date(),
            isRead: false
        };

        chat.updatedAt = new Date();

        await chat.save();

        // Get updated chat with populated fields
        const updatedChat = await Chat.findById(chatId)
            .populate('participants', 'name profilePicture role')
            .populate('messages.sender', 'name profilePicture role')
            .populate('lastMessage.sender', 'name profilePicture role');

        res.status(201).json(updatedChat);
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ message: 'Error sending message' });
    }
};