# form/destructive-label

## Плохо
```tsx
<Modal.Footer>
  <Groups>
    <Button design="outline">Отмена</Button>
    <Button design="accent">OK</Button>
  </Groups>
</Modal.Footer>
```

## Хорошо
```tsx
<Modal.Footer>
  <Groups>
    <Button size="l" design="outline" onClick={close}>Отмена</Button>
    <Button size="l" design="critical" onClick={remove}>Удалить проект</Button>
  </Groups>
</Modal.Footer>
```

Почему: из кнопки должно быть понятно, что произойдёт, без чтения текста модалки, а `critical` сигнализирует, что действие необратимо.
