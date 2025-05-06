import React, { useState } from "react";
import LoginForm from "../components/loginForm";
import RegisterForm from "../components/registerForm";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (<>
    <div className="bg-[#F8FAFC]  flex items-center justify-center p-4 font-[Inter]">
      {isLogin ? (
        <LoginForm onToggle={toggleForm} />
      ) : (
        <RegisterForm onToggle={toggleForm} />
      )}
    </div>
    </>
  );
};

export default AuthPage;
