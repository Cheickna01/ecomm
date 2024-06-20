export default function PanierComponent({panier_count}) {
  return (
    panier_count>0 && <div className="panier_count">{panier_count}</div>
  )
}