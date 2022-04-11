import Item from "./item";

export default function Type({ type, items = [], annotations, ...props }) {
  return (
    <section {...props}>
      <h2 id={type}>{type}</h2>

      {items.map((item, i) => (
        <Item key={ 'type-'+i } item={item} annotations={annotations} />
      ))}
    </section>
  );
}
