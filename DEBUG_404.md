# Arquivos para Checar Root 404 (Prioridade)

## 📂 1º Prioridade - Verifica Existência
```powershell
# Terminal no projeto
dir src/app/
# Deve ter: page.tsx OU (landing)/page.tsx

test-path src/app/page.tsx # Verifica se existe
```

## 🛠️ 2º Arquivos Críticos
| Arquivo | Propósito | Comando Check |
| :--- | :--- | :--- |
| `src/app/page.tsx` | Root `/` | `Get-Content src/app/page.tsx -Head 20` |
| `src/app/layout.tsx` | Layout global | `Get-Content src/app/layout.tsx -Head 20` |
| `src/middleware.ts` | Redirects | `Get-Content src/middleware.ts` |
| `next.config.js` | Rewrites | `Get-Content next.config.js` |
| `vercel.json` | Rewrites | `Get-Content vercel.json` |

## 🔎 3º Debug Commands
```powershell
# 1. Estrutura app/
tree src/app /f

# 2. Conteúdo root page
dir src/app/page.tsx

# 3. Build local
npm run build

# 4. Dev server
# npm run dev
# curl http://localhost:3000/
```

## 📋 4º Conteúdo MÍNIMO page.tsx
```typescript
// src/app/page.tsx
export default function Home() {
  return (
    <div>
      <h1>CouncilIA</h1>
      <a href="/login">Login</a>
    </div>
  );
}
```

## ⚙️ 5º Verifica Configs Conflito
```powershell
# next.config.js - sem rewrites quebrados
Select-String -Pattern "rewrites|redirects" next.config.mjs

# vercel.json - sem root rewrite (se existir)
Select-String -Pattern "/" vercel.json
```

## 🚀 Sequence Debug
1. **CHECK**: `dir src/app/`
2. **BUILD TEST**: `npm run build`
3. **DEPLOY**: `vercel --prod --force`
