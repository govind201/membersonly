const Message = require("../models/Message");

exports.createMessage = async (req, res) => {
  try {
    const { title, text } = req.body;
    const author = req.user._id;

    const newMessage = new Message({
      title,
      timestamp: new Date(),
      text,
      author,
    });

    await newMessage.save();
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.render("new-message", { error: "An error occurred" });
  }
};

exports.getAllMessages = async (req, res) => {
  try {
    const messages = await Message.find().populate("author", "fullName");
    res.render("index", { user: req.user, messages });
  } catch (error) {
    console.log(error);
    res.render("index", { error: "An error occurred" });
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const messageId = req.params.id;
    await Message.findByIdAndDelete(messageId);
    res.redirect("/");
  } catch (error) {
    console.log(error);
    res.redirect("/");
  }
};
