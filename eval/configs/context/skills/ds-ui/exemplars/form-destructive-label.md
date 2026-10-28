# form/destructive-label

## Плохо
```tsx
<Modal.Footer>
  <Button variant="secondary">Отмена</Button>
  <Button variant="danger">OK</Button>
</Modal.Footer>
```

## Хорошо
```tsx
<Modal.Footer>
  <Button variant="secondary">Отмена</Button>
  <Button variant="danger">Удалить проект</Button>
</Modal.Footer>
```

Почему: из кнопки должно быть понятно, что произойдёт, без чтения текста модалки.
