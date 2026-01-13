export function Contact(props) {
  return (
    <div className="task">
      <div className="perfil">
        <img src="src/assets/img/Profile4.png" alt="" />
        <div className="datos">
          <h2>{props.name}</h2>
          <span>{`${props.mobile}, ${props.state}`}</span>
        </div>
      </div>
      <button onClick={() => props.onClick(props.id)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          className="icon icon-tabler icons-tabler-outline icon-tabler-x svgw"
        >
          <path stroke="none" d="M0 0h24v24H0z" />
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}