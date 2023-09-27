const express = require('express');
const path = require('path');
const app = express();

// 정적 파일 제공
app.use(express.static(path.join(__dirname, '../public')));

// 모든 요청에 대해 React 애플리케이션을 불러옴
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public', 'index.html'));
});

// 서버 시작
const port = process.env.PORT || 3000;
app.listen(port, () => {
});

