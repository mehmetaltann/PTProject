const Button = ({ name, icon, onClick, bPad, bRad }) => {
  return (
    <button
      className="button"
      style={{
        padding: bPad,
        borderRadius: bRad,

      }}
      onClick={onClick}
    >
      {icon}
      {name}
    </button>
  );
};

export default Button;
