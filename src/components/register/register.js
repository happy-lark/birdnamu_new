// src/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../api';
import '../register/register.css';  // Import component-specific styles

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        userid: '',
        password: '',
        passwordConfirm: '',
        email: '',
        birthdate: '',
        gender: 'female'
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

// src/Register.js
const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.passwordConfirm) {
        alert('Passwords do not match.');
        return;
    }

    try {
        const response = await fetch('http://localhost:8000/api/register/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userid: formData.userid,
                password: formData.password,
                passwordConfirm: formData.passwordConfirm,  // Ensure this matches the backend
                email: formData.email,
                birthdate: formData.birthdate,
                gender: formData.gender,
            }),
        });

        if (response.ok) {
            navigate('/registration-success');
        } else {
            const errorData = await response.json();
            alert(errorData.error || 'An error occurred during registration.');
        }
    } catch (error) {
        alert('An error occurred. Please try again.');
    }
};

    return (
        <div>
            <header>
                <button onClick={() => navigate(-1)}>뒤로가기</button>
                <h1>회원가입</h1>
                <ul style={{ listStyle: 'none' }}>
                    <li id="last-step">1</li>
                    <li id="current-step">2</li>
                </ul>
            </header>
            <main>
                <section className="title">
                    <div>회원정보를 입력해주세요.</div>
                </section>
                <section className="form">
                    <form>
                        <article>
                            <label htmlFor="username">이름</label>
                            <input type="text" id="username" name="username" value={formData.username} onChange={handleChange} />
                        </article>
                        <article>
                            <label htmlFor="userid">아이디</label>
                            <input type="text" id="userid" name="userid" value={formData.userid} onChange={handleChange} />
                        </article>
                        <article>
                            <label htmlFor="password">비밀번호</label>
                            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} />
                        </article>
                        <article>
                            <label htmlFor="password-confirm">비밀번호 확인</label>
                            <input type="password" id="password-confirm" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} />
                        </article>
                        <article>
                            <label htmlFor="email">이메일 주소</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} />
                        </article>
                        <article>
                            <label htmlFor="birthdate">생년월일</label>
                            <input type="date" id="birthdate" name="birthdate" value={formData.birthdate} onChange={handleChange} />
                        </article>
                        <article>
                            <label htmlFor="gender">성별</label>
                            <select name="gender" id="gender" value={formData.gender} onChange={handleChange}>
                                <option value="female">여성</option>
                                <option value="male">남성</option>
                                <option value="other">기타</option>
                            </select>
                        </article>
                    </form>
                </section>
                <section className="submit">
                    <article>
                        <input type="button" id="submit" value="가입완료" onClick={handleSubmit} />
                    </article>
                </section>
            </main>
        </div>
    );
};

export default Register;
