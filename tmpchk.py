path='src/pages/logistics/order.vue'
with open(path,encoding='utf-8') as f:
  s=f.read()
i=s.find('.logisticorder__modal-key')
if i<0: print('no'); raise SystemExit
s2=s.find('{',i)
b=1; instr=False; q=None; esc=False
for k,ch in enumerate(s[s2+1:], start=s2+1):
  if instr:
    if esc: esc=False; continue
    if ch=='\': esc=True; continue
    if ch==q: instr=False; q=None; continue
    continue
  if ch=='"' or ch=="'" or ch=='`': instr=True; q=ch; continue
  if ch=='{': b+=1
  if ch=='}':
    b-=1
    if b==0:
      print(s[i:k+1])
      break
