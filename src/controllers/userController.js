const UserRepository = require('../repositories/UserRepository');

class UserController {
  constructor() {
    this.repository = new UserRepository();
  }

  async register(req, res) {
    try {
      const user = await this.repository.create(req.body);
      res.status(201).send(user);
    } catch (error) {
      res.status(500).send({ message: "Failed to register user", error: error.toString() });
    }
  }
  
  async login(req, res) {
    const { username, password } = req.body;
    const user = await UserRepository.findByUsername(username);

    if (!user || !await bcrypt.compare(password, user.password)) {
        return res.status(401).send({ message: 'Authentication failed' });
    }

    const token = jwt.sign({ id: user._id }, 'secret', { expiresIn: '1h' });
    res.send({ token });
  }
}

module.exports = new UserController();