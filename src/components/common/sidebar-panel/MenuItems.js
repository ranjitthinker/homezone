import Link from "next/link";

const MenuItems = () => {
  const menuItems = [
    { id: 1, title: "Apartments", category: "Apartments" },
    { id: 2, title: "Bungalow", category: "Bungalow" },
    { id: 3, title: "Houses", category: "Houses" },
    { id: 4, title: "Loft", category: "Loft" },
    { id: 5, title: "Office", category: "Office" },
    { id: 6, title: "Townhome", category: "Townhome" },
    { id: 7, title: "Villa", category: "Villa" },
  ];

  return (
    <ul className="navbar-nav">
      {menuItems.map((item) => (
        <li className="nav-item" key={item.id}>
          <Link
            className="nav-link"
            href={`/properties?propertyType=${encodeURIComponent(item.category)}`}
            role="button"
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MenuItems;
