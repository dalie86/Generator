# ds/only-tokens

## Плохо
```tsx
<div style={{ padding: 16, color: "#c62828" }}>Ошибка</div>
<Flex gap="16px" mt="24px">…</Flex>
```

## Хорошо
```tsx
<Flex gap="s4" mt="s6">…</Flex>
<FormField.Message color="critical">Введите название проекта</FormField.Message>
```

Почему: hex и px выглядят правильно сегодня и ломаются при смене темы. ViennaUI принимает строку в пропсах отступов, поэтому `"16px"` не даст ошибку типов — только линтер.
