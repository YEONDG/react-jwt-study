const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const db = require('./db');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_ACCESS_EXPIRES_IN = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
const JWT_REFRESH_EXPIRES_IN = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

app.use(cors());
app.use(express.json());

// 비밀번호 암호화 함수
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// JWT 토큰 생성 함수

// 회원가입 API
app.post('/register', async (req, res) => {
  const { username, password, name, age } = req.body;
  console.log(req.body, 'req.body');

  // 입력 값 검증
  if (!username || !password || !name || !age) {
    return res.status(400).json({ message: '모든 필드를 입력해주세요.' });
  }

  try {
    // 비밀번호 해싱
    const hashedPassword = await hashPassword(password);

    // INSERT 쿼리에 name과 age 추가
    const query = `INSERT INTO users (username, password, name, age) VALUES (?, ?, ?, ?)`;
    db.run(query, [username, hashedPassword, name, age], function (err) {
      if (err) {
        return res
          .status(500)
          .json({ message: '사용자 등록 실패', error: err.message });
      }
      return res.status(201).json({
        message: '회원가입 성공',
        user: {
          userId: this.lastID,
          username,
          name,
          age,
        },
      });
    });
  } catch (error) {
    res.status(500).json({ message: '서버 오류', error: error.message });
  }
});

// 로그인 API
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ message: '아이디와 비밀번호를 입력해주세요.' });
  }

  const query = `SELECT * FROM users WHERE username = ?`;
  db.get(query, [username], async (err, user) => {
    if (err || !user) {
      return res.status(401).json({ message: '사용자를 찾을 수 없습니다.' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: '비밀번호가 올바르지 않습니다.' });
    }

    const accessToken = jwt.sign(
      { id: user.id, username: user.username, name: user.name, age: user.age },
      JWT_SECRET,
      { expiresIn: JWT_ACCESS_EXPIRES_IN }
    );
    const refreshToken = jwt.sign(
      { id: user.id, username: user.username, name: user.name, age: user.age },
      JWT_SECRET,
      { expiresIn: JWT_REFRESH_EXPIRES_IN }
    );

    res.json({ message: '로그인 성공', accessToken, refreshToken });
  });
});

// 인증 미들웨어
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: '토큰이 제공되지 않았습니다.' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: '유효하지 않은 토큰입니다.' });
    }
    req.user = user;
    next();
  });
};

app.post('/refresh', (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res
      .status(401)
      .json({ message: 'Refresh Token이 제공되지 않았습니다.' });
  }

  jwt.verify(refreshToken, JWT_SECRET, (err, user) => {
    if (err) {
      return res
        .status(403)
        .json({ message: '유효하지 않은 Refresh Token입니다.' });
    }

    // 새로운 Access Token 발급
    const newAccessToken = jwt.sign(
      { id: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ accessToken: newAccessToken });
  });
});

// 사용자 정보 조회 API (인증 필요)
app.get('/mypage', authenticateToken, (req, res) => {
  console.log('req.user:', req.user);
  res.json({ message: '사용자 정보 조회 성공', user: req.user });
});

// 서버 시작
app.listen(PORT, () => {
  console.log(`서버가 http://localhost:${PORT} 에서 실행 중입니다.`);
});
