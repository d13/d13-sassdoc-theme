import Item from "./item";

export default function Type({ type, items = [], annotations, ...props }) {
  return (
    <section {...props} className="type" id={type}>
      <header className="type__header">
        <h2 className="type__name">{type}</h2>
      </header>
      {items.map((item, i) => (
        <Item key={ 'type-'+i } item={item} annotations={annotations} />
      ))}
    </section>
  );
}
