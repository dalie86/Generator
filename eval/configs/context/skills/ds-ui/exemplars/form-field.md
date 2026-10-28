# form/field-wrapper, form/inline-errors

## Плохо
```tsx
<Input placeholder="Название проекта" onChange={(e) => setName(e.target.value)} />
{error && <Text>Ошибка</Text>}
```

## Хорошо
```tsx
<FormField>
  <FormField.Label required>Название проекта</FormField.Label>
  <FormField.Content>
    <Input value={name} invalid={!!error} onChange={({ value }) => setName(value)} />
    {error && <FormField.Message color="critical">{error}</FormField.Message>}
  </FormField.Content>
</FormField>
```

Почему: подпись видна всегда, ошибка стоит под своим полем, а `onChange` у ViennaUI получает `{ value }`, а не DOM-событие — `e.target.value` здесь не сработает.
