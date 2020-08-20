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

  static async readMessage(req, res) {
    const messages = await Message.find();
    if (messages.length === 0) {
      return res
        .status(404)
        .send({ msg: 'No message you have' });
    }
    return res
      .status(200)
      .send(messages);
  }

  static async deleteMessage(req, res) {
    const { _id } = req.params;
    const result = await Message.findByIdAndDelete({ _id });
    if (!result) {
      return res
        .status(404)
        .send({ msg: 'No message with such Id' });
    }
    return res
      .status(200)
      .send({
        msg: 'Successfully deleted',
        result
      });
  }
}

export default MessageController;
