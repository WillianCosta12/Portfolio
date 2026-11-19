// Avisa os buscadores que usam o IndexNow (Bing, Yandex, Naver, Seznam...) de todas as páginas do sitemap.
// Rodar depois de cada deploy que muda o texto do site:  node scripts/indexnow.mjs
// A chave fica publicada em public/<chave>.txt; é ela que prova que o aviso vem do dono do site.
// O Google não usa IndexNow: lá o pedido de indexação é pelo Search Console.

const SITE = (process.env.SITE_URL || 'https://williancosta.vercel.app').replace(/\/+$/, '')
const KEY = '9fecfd7953328a486f704758457596ce'

const sitemap = await (await fetch(`${SITE}/sitemap.xml`)).text()
const urlList = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1])
if (!urlList.length) throw new Error('o sitemap não trouxe nenhum endereço')

// the key file must be live before the search engines will accept the list
const keyCheck = await fetch(`${SITE}/${KEY}.txt`)
if (!keyCheck.ok || (await keyCheck.text()).trim() !== KEY) throw new Error(`a chave não está publicada em ${SITE}/${KEY}.txt (faça o deploy primeiro)`)

const res = await fetch('https://api.indexnow.org/indexnow', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8' },
  body: JSON.stringify({ host: new URL(SITE).host, key: KEY, keyLocation: `${SITE}/${KEY}.txt`, urlList }),
})
// 200 or 202: received (202 = the key is still being checked); 4xx: something to fix
console.log(`IndexNow: ${res.status} ${res.statusText} · ${urlList.length} endereços`)
urlList.forEach((u) => console.log(`  ${u}`))
