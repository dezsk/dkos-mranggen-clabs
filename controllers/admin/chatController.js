const Chat = require('../../models/Chat');
const User = require('../../models/User');

// Get all chats for admin
exports.getAllChats = async (req, res) => {
    try {
        // Admin can see all chats where they are a participant
        const chats = await Chat.find({
            participants: req.user.id
        })
        .populate('participants', 'name profilePicture role')
        .populate('lastMessage.sender', 'name')
        .sort({ 'lastMessage.timestamp': -1 });

        res.status(200).json({ success: true, data: chats });
    } catch (error) {
        console.error('Error fetching admin chats:', error);
        res.status(500).json({ success: false, message: 'Error fetching chats' });
    }
};

// Get all users for starting new chat
exports.getAllUsersForChat = async (req, res) => {
    try {
        // Get all users except current admin
        const users = await User.find({
            _id: { $ne: req.user.id },
            role: 'user',
            status: 'active'
        })
        .select('name profilePicture');

        res.status(200).json({ success: true, data: users });
    } catch (error) {
        console.error('Error fetching users for chat:', error);
        res.status(500).json({ success: false, message: 'Error fetching users' });
    }
};

// Get chat by ID
exports.getChatById = async (req, res) => {
    try {
        const chat = await Chat.findById(req.params.chatId)
            .populate('participants', 'name profilePicture role')
            .populate('messages.sender', 'name profilePicture role');

        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat not found' });
        }

        // Check if admin is participant in this chat
        if (!chat.participants.some(p => p._id.toString() === req.user.id)) {
            return res.status(403).json({ success: false, message: 'Not authorized to access this chat' });
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

        res.status(200).json({ success: true, data: chat });
    } catch (error) {
        console.error('Error fetching chat:', error);
        res.status(500).json({ success: false, message: 'Error fetching chat details' });
    }
};

// Create new chat with user
exports.createChat = async (req, res) => {
    try {
        const { userId } = req.body;

        if (!userId) {
            return res.status(400).json({ success: false, message: 'User ID is required' });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        // Check if user is not an admin
        if (user.role === 'admin') {
            return res.status(400).json({ success: false, message: 'Cannot create chat with another admin' });
        }

        // Check if chat already exists between admin and user
        let chat = await Chat.findOne({
            participants: { $all: [req.user.id, userId] }
        })
        .populate('participants', 'name profilePicture role')
        .populate('messages.sender', 'name profilePicture role');

        // If chat exists, return it
        if (chat) {
            return res.status(200).json({ success: true, data: chat });
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

        res.status(201).json({ success: true, data: chat });
    } catch (error) {
        console.error('Error creating chat:', error);
        res.status(500).json({ success: false, message: 'Error creating chat' });
    }
};

// Send message
exports.sendMessage = async (req, res) => {
    try {
        const { chatId } = req.params;
        const { content } = req.body;

        if (!content) {
            return res.status(400).json({ success: false, message: 'Message content is required' });
        }

        const chat = await Chat.findById(chatId);
        if (!chat) {
            return res.status(404).json({ success: false, message: 'Chat not found' });
        }

        // Check if admin is participant in this chat
        if (!chat.participants.includes(req.user.id)) {
            return res.status(403).json({ success: false, message: 'Not authorized to send message in this chat' });
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

        res.status(201).json({ success: true, data: updatedChat });
    } catch (error) {
        console.error('Error sending message:', error);
        res.status(500).json({ success: false, message: 'Error sending message' });
    }
};

// Get chat statistics
exports.getChatStatistics = async (req, res) => {
    try {
        // Total chats where admin is participant
        const totalChats = await Chat.countDocuments({
            participants: req.user.id
        });

        // Chats with unread messages
        const chatsWithUnreadMessages = await Chat.countDocuments({
            participants: req.user.id,
            'lastMessage.isRead': false,
            'lastMessage.sender': { $ne: req.user.id }
        });

        // Total messages sent by admin
        const adminChats = await Chat.find({ participants: req.user.id });
        let totalMessagesSent = 0;
        
        adminChats.forEach(chat => {
            chat.messages.forEach(message => {
                if (message.sender.toString() === req.user.id) {
                    totalMessagesSent++;
                }
            });
        });

        res.status(200).json({
            success: true,
            data: {
                totalChats,
                chatsWithUnreadMessages,
                totalMessagesSent
            }
        });
    } catch (error) {
        console.error('Error fetching chat statistics:', error);
        res.status(500).json({ success: false, message: 'Error fetching chat statistics' });
    }
};