// src/Login.js
import React from 'react';
import '../login/login.css';
import logo from '../../assets/images/crow-solid.svg'; // Import the image

class Login extends React.Component {
    handleSubmit = async (event) => {
        event.preventDefault();

        const formData = {
            id: event.target.id.value,
            pw: event.target.pw.value,
        };

        try {
            const response = await fetch('http://localhost:8000/api/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Login successful:', data);
                window.location.href = '#';  // Redirect to '#' on success
                // Handle success
            } else {
                const errorData = await response.json();
                console.error('Login failed:', errorData.error);
                alert(errorData.error);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        }
    }

    render() {
        return (
            <div className="wrapper">
                <div id="logo">
                    <img src={logo} alt="logo" /> {/* Use the imported image */}
                </div>
                <form onSubmit={this.handleSubmit} id="loginForm">
                    <div className="input-group" id="username">
                        <label htmlFor="id">아이디 입력:</label>
                        <input type="text" id="id" name="id" placeholder="아이디를 입력하세요" />
                    </div>

                    <div className="input-group" id="pw">
                        <label htmlFor="pw">비밀번호:</label>
                        <input type="password" id="pw" name="pw" placeholder="비밀번호를 입력하세요" minLength="8" required />
                    </div>

                    <div id="button">
                        <input type="submit" value="로그인" />
                    </div>
                </form>
            </div>
        );
    }
}

export default Login;
