# ds/only-tokens

## Плохо
```tsx
<div style={{ padding: 13, color: "#c62828" }}>Ошибка</div>
<div className="p-[13px] text-[#c62828]">Ошибка</div>
```

## Хорошо
```tsx
<div style={{ padding: "var(--space-3)", color: "var(--color-danger-default)" }}>Ошибка</div>
```

А ещё лучше — компонент DS, у которого это уже зашито:
```tsx
<InlineMessage tone="error">Ошибка</InlineMessage>
```

Почему: hex и px выглядят правильно сегодня и ломаются при смене темы или бренда. На ревью глазами такое не видно.
