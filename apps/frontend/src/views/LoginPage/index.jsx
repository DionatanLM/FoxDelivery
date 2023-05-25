import { useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styles from './LoginPage.module.scss';
// import { useAuth } from '../../stores/auth.store';
// import AuthColRight from '../../components/AuthColRight';
import { signIn, useSession } from 'next-auth/react';
import LoadingButton from '@/components/LoadingButton';
// import { useCallbackUrl } from '../../stores/callback-url.store';
// import LoadingButton from '../../components/LoadingButton';
// import useStorage from '../../hooks/use-storage';

const LoginPage = () => {
  //   const { login, showMessage, message, hideAuthMessage, loading } = useAuth();
  //   const { callbackUrl, setCallbackUrl } = useCallbackUrl();

  const validationSchema = Yup.object().shape({
    username: Yup.string()
      .required('Um email ou CPF é obrigatório')
      .lowercase(),
    password: Yup.string().required('Senha é obrigatória'),
  });

  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;
  const router = useRouter();
  const session = useSession();
  //   const { setItem } = useStorage();

  const onSubmit = async data => {
    await login(data);
  };

  //   useEffect(() => {
  //     if (router.query?.callbackUrl) {
  //       setCallbackUrl(router.query.callbackUrl);
  //     }
  //     if (router.query?.ref) {
  //       setItem('referralCode', router.query.callbackUrl);
  //     }
  //   }, [router.query]);

  //   useEffect(() => {
  //     if (session.data) {
  //       if (callbackUrl) {
  //         router.push(callbackUrl);
  //         setCallbackUrl(undefined);
  //       } else {
  //         router.push('/');
  //       }
  //     }
  //     if (showMessage) {
  //       setTimeout(() => {
  //         hideAuthMessage();
  //       }, 6000);
  //     }
  //   }, [session.data, message, showMessage]);

  return (
    <Row className={styles.wrapperRow}>
      <Col
        xxl={4}
        xl={5}
        lg={5}
        xs={12}
        className={`full-height ${styles.wrapperLeft}`}
      >
        <div className="login-main-left">
          <div className={`text-left ${styles.header}`}>
            <div className="d-flex justify-content-center">
              <div className={`d-lg-none ${styles.mobileLogo}`}>
                <Image
                  src="/img/newLogoFoxDelivery.png"
                  fill={true}
                  className={styles.loginImage}
                  alt="Logo FOX"
                />
              </div>
              <div className={`d-none d-lg-block ${styles.desktopLogo}`}>
                <Image
                  src="/img/newLogoFoxDelivery.png"
                  fill={true}
                  alt="Logo FOX"
                />
              </div>
            </div>
            <h5 className={`d-none d-lg-block mb-2 ${styles.welcomeTitle}`}>
              Bem-vindo de volta
            </h5>
            <p className={styles.welcomeSubTitle}>
              Entre com seus dados de acesso!
            </p>
          </div>
          <Form
            noValidate
            onSubmit={handleSubmit(onSubmit)}
          >
            <Form.Group className="mb-3">
              <Form.Label className={styles.labels}>
                Email, CPF ou CNPJ
              </Form.Label>
              <Form.Control
                size="lg"
                type="text"
                placeholder="Informe seu email, CPF ou CNPJ
                "
                {...register('username')}
                isInvalid={!!errors.username}
              />
              <Form.Control.Feedback
                type="invalid"
                className={styles.textError}
              >
                {errors.username?.message}
              </Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label className={styles.labels}>Senha</Form.Label>
              <Form.Control
                size="lg"
                type="password"
                placeholder="*************"
                {...register('password')}
                isInvalid={!!errors.password}
              />
              <Form.Control.Feedback
                type="invalid"
                className={styles.textError}
              >
                {errors.password?.message}
              </Form.Control.Feedback>

              {/* {showMessage && !errors.password?.message && (
                <p className={styles.textError}>{message}</p>
              )} */}
            </Form.Group>

            <Form.Group
              as={Row}
              className="d-flex align-items-center"
              controlId="formHorizontalCheck"
            >
              <Col className={styles.checkContainer}>
                {/* <Form.Check type="checkbox">
                  <Form.Check.Input
                    type="checkbox"
                  />
                  <Form.Check.Label>Lembrar de mim</Form.Check.Label>
                </Form.Check> */}
              </Col>
              <Col className="d-flex justify-content-end">
                <Link
                  href="/esqueci-minha-senha"
                  className={styles.forgetPasswordText}
                >
                  Esqueci minha senha
                </Link>
              </Col>
            </Form.Group>

            <div className="mt-4 d-grid">
              <LoadingButton
                className={styles.boxes}
                type="submit"
                variant="primary"
                //loading={loading || session?.data}
                text="Login"
                loadingText="Logando..."
              />
            </div>
          </Form>

          <div className={styles.hrContainer}>
            <hr className="my-4" />
            <span>ou</span>
            <hr className="my-4" />
          </div>

          <div className="mt-0 d-grid">
            <Button
              className={styles.boxes}
              variant="social"
              size="lg"
              onClick={() =>
                signIn('google', { callbackUrl: callbackUrl || '/' })
              }
            >
              <img src="/img/logo_google.svg" />
              <span>Fazer login com Google</span>
            </Button>
          </div>

          <div className={`text-center ${styles.register}`}>
            <p className={styles.dontHaveAccountText}>
              Não tem uma conta?{' '}
              <Link
                className={styles.registerText}
                href="/cadastre-se"
              >
                Cadastre-se
              </Link>
            </p>
          </div>
        </div>
      </Col>
      <Col
        xs={0}
        lg={7}
        xl={7}
        xxl={8}
        className={`p-5 full-height d-flex justify-content-center align-items-center ${styles.wrapperRight}`}
      >
        <div className={styles.imageContainer}>
          <Image
            src="/img/logoWhite.png"
            fill={true}
            className={styles.loginImage}
            alt="Logo FOX"
          />
        </div>
      </Col>
    </Row>
  );
};
export default LoginPage;
