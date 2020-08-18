import Message from '../../models/messages';

class MessageController {
  static async postMessage(req, res) {
    const { names, email, message } = req.body;

    const newMessage = new Message({
      names, email, message
    });
    const savedMessage = await newMessage.save();
    return res
      .status(200)
      .send({
        msg: 'Message sent Successfully',
        savedMessage
      });
  }
}

export default MessageController;
