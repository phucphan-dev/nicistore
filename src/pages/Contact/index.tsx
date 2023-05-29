import { yupResolver } from '@hookform/resolvers/yup';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Controller, FormProvider, useForm } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';

import Button from 'components/atoms/Button';
import Icon from 'components/atoms/Icon';
import Image from 'components/atoms/Image';
import Input from 'components/atoms/Input';
import Link from 'components/atoms/Link';
import TextArea from 'components/atoms/TextArea';
import Typography from 'components/atoms/Typography';
import Container from 'components/organisms/Container';
import Section from 'components/organisms/Section';
import { contactUsService } from 'services/contact';
import { ContactDataRequest } from 'services/contact/types';
import { contactScheme } from 'utils/schemas';

const Contact: React.FC = () => {
  const method = useForm<ContactDataRequest>({
    resolver: yupResolver(contactScheme),
  });
  const { mutate: contactMutate, isLoading } = useMutation(
    'contactAction',
    contactUsService,
    {
      onSettled: () => {
        method.reset();
        toast.success('Cảm ơn bạn đã để lại thông tin!', { toastId: 'subscribeSuccess' });
      }
    }
  );
  const onSubmit = (data: ContactDataRequest) => {
    contactMutate(data);
  };
  return (
    <>
      <Helmet>
        <title>Nici Store | Liên hệ</title>
      </Helmet>
      <Section noSpace>
        <div className="p-contact">
          <Image imgSrc="https://klbtheme.com/clotya/wp-content/uploads/elementor/thumbs/image-15-pqcdr1rlo5zgkmf9mhlpgtdb7vxe92fhkbv7njwet4.jpg" alt="contact" ratio="96x23" />
          <Container>
            <div className="p-contact_flex">
              <div className="p-contact_content">
                <Typography.Heading type="h1" modifiers={['40x48']}>Liên hệ</Typography.Heading>
                {/* <div className="p-contact_description">
              <Typography.Text modifiers={['16x18']}>
                In hac habitasse platea dictumst. Pellentesque viverra sem nec orci lacinia,
                in bibendum urna mollis. Quisque nunc lacus, varius vel leo a,
                pretium lobortis metus.
                Vivamus consectetur consequat justo.
              </Typography.Text>
            </div> */}
                <div className="p-contact_form">
                  <FormProvider {...method}>
                    <div className="p-contact_field">
                      <Controller
                        name="name"
                        control={method.control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <Input
                            name="email"
                            required
                            label="Họ và tên"
                            type="text"
                            value={value}
                            bordered
                            onChange={onChange}
                            error={error?.message}
                          />
                        )}
                      />
                    </div>
                    <div className="p-contact_field">
                      <Controller
                        name="email"
                        control={method.control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <Input
                            name="email"
                            required
                            label="Email"
                            type="text"
                            value={value}
                            bordered
                            onChange={onChange}
                            error={error?.message}
                          />
                        )}
                      />
                    </div>
                    <div className="p-contact_field">
                      <Controller
                        name="subject"
                        control={method.control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <Input
                            name="subject"
                            required
                            label="Chủ đề"
                            type="text"
                            value={value}
                            bordered
                            onChange={onChange}
                            error={error?.message}
                          />
                        )}
                      />
                    </div>
                    <div className="p-contact_field">
                      <Controller
                        name="message"
                        control={method.control}
                        render={({
                          field: { onChange, value },
                          fieldState: { error },
                        }) => (
                          <TextArea
                            name="message"
                            label="Lời nhắn"
                            rows={6}
                            value={value}
                            onChange={onChange}
                            error={error?.message}
                          />
                        )}
                      />
                    </div>
                    <div className="p-contact_button">
                      <Button
                        variant="primary"
                        sizes="h42"
                        handleClick={method.handleSubmit(onSubmit)}
                        loading={isLoading}
                      >
                        Gửi thông tin
                      </Button>
                    </div>
                  </FormProvider>
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
    </>
  );
};

export default Contact;
