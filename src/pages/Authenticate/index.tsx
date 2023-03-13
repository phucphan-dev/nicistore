/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';

import Button from 'components/atoms/Button';
import Checkbox from 'components/atoms/Checkbox';
import Input from 'components/atoms/Input';
import Link from 'components/atoms/Link';
import Typography from 'components/atoms/Typography';
import Section from 'components/organisms/Section';
import mapModifiers from 'utils/functions';

const Authenticate: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <Section>
      <div className="p-authenticate">
        <div className="p-authenticate_tabs">
          <div className={mapModifiers('p-authenticate_btnLogin', isLogin && 'active')}>
            <Button handleClick={() => setIsLogin(true)}>
              <Typography.Text modifiers={['18x21', '700']}>LOGIN</Typography.Text>
            </Button>
          </div>
          <div className={mapModifiers('p-authenticate_btnRegister', !isLogin && 'active')}>
            <Button handleClick={() => setIsLogin(false)}>
              <Typography.Text modifiers={['18x21', '700']}>REGISTER</Typography.Text>
            </Button>
          </div>
        </div>
        <div className="p-authenticate_content">
          <div className={mapModifiers('p-authenticate_login', isLogin && 'active')}>
            <div className="p-authenticate_field">
              <Input required label="Username or email address" type="text" bordered />
            </div>
            <div className="p-authenticate_field">
              <Input required label="Password" type="password" bordered />
            </div>
            <div className="p-authenticate_field">
              <Checkbox name="isRemember">Remember me</Checkbox>
            </div>
            <div className="p-authenticate_button">
              <Button variant="primary" sizes="h42">Log in</Button>
            </div>
            <div className="p-authenticate_forgot">
              <Link><Typography.Text modifiers={['14x16', 'ferrariRed']}>Forgot password?</Typography.Text></Link>
            </div>
          </div>
          <div className={mapModifiers('p-authenticate_register', !isLogin && 'active')}>
            <div className="p-authenticate_field">
              <Input required label="Username" type="text" bordered />
            </div>
            <div className="p-authenticate_field">
              <Input required label="Email" type="text" bordered />
            </div>
            <div className="p-authenticate_field">
              <Input required label="Password" type="password" bordered />
            </div>
            <div className="p-authenticate_button">
              <Button variant="primary" sizes="h42">Register</Button>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Authenticate;
