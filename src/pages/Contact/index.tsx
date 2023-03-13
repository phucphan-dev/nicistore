import React from 'react';

import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Image from 'components/atoms/Image';
import Input from 'components/atoms/Input';
import Link from 'components/atoms/Link';
import TextArea from 'components/atoms/TextArea';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import Section from 'components/organisms/Section';

const Contact: React.FC = () => (
  <Section noSpace>
    <div className="p-contact">
      <Image imgSrc="https://klbtheme.com/clotya/wp-content/uploads/elementor/thumbs/image-15-pqcdr1rlo5zgkmf9mhlpgtdb7vxe92fhkbv7njwet4.jpg" alt="contact" ratio="96x23" />
      <Container>
        <div className="p-contact_flex">
          <div className="p-contact_content">
            <Typography.Heading type="h4" modifiers={['18x21', 'carminePink', '400']}>Contact with us</Typography.Heading>
            <Typography.Heading type="h1" modifiers={['40x48']}>Get In Touch</Typography.Heading>
            <div className="p-contact_description">
              <Typography.Text modifiers={['16x18']}>
                In hac habitasse platea dictumst. Pellentesque viverra sem nec orci lacinia,
                in bibendum urna mollis. Quisque nunc lacus, varius vel leo a,
                pretium lobortis metus.
                Vivamus consectetur consequat justo.
              </Typography.Text>
            </div>
            <div className="p-contact_form">
              <div className="p-contact_field flex">
                <Input required label="Your name" type="text" bordered />
                <Input required label="Your email" type="text" bordered />
              </div>
              <div className="p-contact_field">
                <Input required label="Subject" type="text" bordered />
              </div>
              <div className="p-contact_field">
                <TextArea label="Your message" rows={6} />
              </div>
              <div className="p-contact_button">
                <Button variant="primary" sizes="h42">Send Message</Button>
              </div>
            </div>
          </div>
          <div className="p-contact_info">
            <div className="p-contact_info_line">
              <Icon iconName="phone" size="20" />
              <Link useExternal href="tel:0388197156" target="_blank"><Typography.Text modifiers={['16x18']}>0388.197.156</Typography.Text></Link>
            </div>
            <div className="p-contact_info_line">
              <Icon iconName="gmail" size="20" />
              <Link useExternal href="mailto:nici.store99@gmail.com" target="_blank"><Typography.Text modifiers={['16x18']}>nici.store99@gmail.com</Typography.Text></Link>
            </div>
            <div className="p-contact_info_line">
              <Icon iconName="facebook" size="20" />
              <Link useExternal href="https://www.facebook.com/nici.store99" target="_blank"><Typography.Text modifiers={['16x18']}>fb.com/nici.store99</Typography.Text></Link>
            </div>
            <div className="p-contact_info_line">
              <Icon iconName="instagram" size="20" />
              <Link useExternal href="https://www.instagram.com/nici.store/" target="_blank"><Typography.Text modifiers={['16x18']}>instagram.com/nici.store</Typography.Text></Link>
            </div>
            <div className="p-contact_info_line">
              <Icon iconName="tiktok" size="20" />
              <Link useExternal href="https://www.tiktok.com/@nici.store" target="_blank"><Typography.Text modifiers={['16x18']}>tiktok.com/@nici.store</Typography.Text></Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  </Section>
);

export default Contact;
