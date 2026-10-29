import { useState, type FormEvent } from "react";
import {
  Alert,
  Button,
  Card,
  Flex,
  FormField,
  Groups,
  Input,
  InputPassword,
  Text,
  Timer,
} from "vienna-ui";

type Step = "credentials" | "code" | "done";

const RESEND_SECONDS = 59;
const CODE_LENGTH = 6;
const MASKED_PHONE = "+7 ••• •••-12-34";

/** Имитация запроса к серверу: в реальном экране здесь вызов API. */
const request = <T,>(result: T, ms = 900) =>
  new Promise<T>((resolve) => setTimeout(() => resolve(result), ms));

export interface ScreenProps {
  /** Шаг, с которого открывается экран (нужно для stories). */
  initialStep?: Step;
}

export default function Screen({ initialStep = "credentials" }: ScreenProps) {
  const [step, setStep] = useState<Step>(initialStep);

  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [authError, setAuthError] = useState("");

  const [code, setCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [resendKey, setResendKey] = useState(0);
  const [canResend, setCanResend] = useState(false);

  const [loading, setLoading] = useState(false);

  const submitCredentials = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    const nextLoginError = login.trim() ? "" : "Введите логин или номер телефона";
    const nextPasswordError = password ? "" : "Введите пароль";
    setLoginError(nextLoginError);
    setPasswordError(nextPasswordError);
    setAuthError("");
    if (nextLoginError || nextPasswordError) return;

    setLoading(true);
    // Демо: пароль "error" имитирует неверные данные
    const ok = await request(password !== "error");
    setLoading(false);
    if (!ok) {
      setAuthError("Неверный логин или пароль. Проверьте раскладку и Caps Lock.");
      return;
    }
    setCode("");
    setCodeError("");
    setCanResend(false);
    setResendKey((k) => k + 1);
    setStep("code");
  };

  const submitCode = async (e: FormEvent) => {
    e.preventDefault();
    if (loading) return;
    if (code.length !== CODE_LENGTH) {
      setCodeError(`Введите код из ${CODE_LENGTH} цифр из СМС`);
      return;
    }
    setCodeError("");
    setLoading(true);
    // Демо: верный код — 123456
    const ok = await request(code === "123456");
    setLoading(false);
    if (!ok) {
      setCodeError("Код не подходит. Проверьте СМС или запросите новый код.");
      return;
    }
    setStep("done");
  };

  const resendCode = async () => {
    setCanResend(false);
    setCode("");
    setCodeError("");
    await request(true, 400);
    setResendKey((k) => k + 1);
  };

  const backToCredentials = () => {
    setPassword("");
    setCode("");
    setCodeError("");
    setStep("credentials");
  };

  return (
    <Flex justifyContent="center" alignItems="flex-start" mt="s16">
      {step === "credentials" && (
        <Card title="Вход в интернет-банк">
          <form onSubmit={submitCredentials} noValidate>
            <Flex direction="column" gap="s4">
              {authError && (
                <Alert design="error" title="Не удалось войти">
                  {authError}
                </Alert>
              )}

              <FormField>
                <FormField.Label required>Логин или номер телефона</FormField.Label>
                <FormField.Content>
                  <Input
                    name="login"
                    autoComplete="username"
                    value={login}
                    invalid={!!loginError}
                    onChange={({ value }) => {
                      setLogin(value);
                      if (loginError) setLoginError("");
                    }}
                  />
                  {loginError && <FormField.Message color="critical">{loginError}</FormField.Message>}
                </FormField.Content>
              </FormField>

              <FormField>
                <FormField.Label required>Пароль</FormField.Label>
                <FormField.Content>
                  <InputPassword
                    name="password"
                    autoComplete="current-password"
                    value={password}
                    invalid={!!passwordError}
                    onChange={({ value }) => {
                      setPassword(value);
                      if (passwordError) setPasswordError("");
                    }}
                  />
                  {passwordError && (
                    <FormField.Message color="critical">{passwordError}</FormField.Message>
                  )}
                </FormField.Content>
              </FormField>

              <Button type="submit" design="accent" size="l" grid={12} loading={loading} disabled={loading}>
                Войти
              </Button>
            </Flex>
          </form>
        </Card>
      )}

      {step === "code" && (
        <Card title="Подтверждение входа">
          <form onSubmit={submitCode} noValidate>
            <Flex direction="column" gap="s4">
              <Text>Мы отправили СМС с кодом на номер {MASKED_PHONE}</Text>

              <FormField>
                <FormField.Label required>Код из СМС</FormField.Label>
                <FormField.Content>
                  <Input
                    name="code"
                    autoComplete="one-time-code"
                    inputMode="numeric"
                    maxLength={CODE_LENGTH}
                    value={code}
                    invalid={!!codeError}
                    onChange={({ value }) => {
                      setCode(value.replace(/\D/g, "").slice(0, CODE_LENGTH));
                      if (codeError) setCodeError("");
                    }}
                  />
                  {codeError && <FormField.Message color="critical">{codeError}</FormField.Message>}
                </FormField.Content>
              </FormField>

              {canResend ? (
                <Button type="button" design="ghost" onClick={resendCode}>
                  Отправить код повторно
                </Button>
              ) : (
                <Timer
                  key={resendKey}
                  start={RESEND_SECONDS}
                  stop={0}
                  countdown
                  onStop={() => setCanResend(true)}
                >
                  {(count) => <Text>Новый код можно запросить через {count} с</Text>}
                </Timer>
              )}

              <Groups>
                <Button type="button" design="outline" size="l" onClick={backToCredentials} disabled={loading}>
                  Назад
                </Button>
                <Button type="submit" design="accent" size="l" loading={loading} disabled={loading}>
                  Войти
                </Button>
              </Groups>
            </Flex>
          </form>
        </Card>
      )}

      {step === "done" && (
        <Card title="Вход выполнен">
          <Flex direction="column" gap="s4">
            <Alert design="success" title="Вы вошли в интернет-банк">
              Сейчас откроется главная страница.
            </Alert>
            <Button type="button" design="outline" onClick={backToCredentials}>
              Выйти
            </Button>
          </Flex>
        </Card>
      )}
    </Flex>
  );
}
