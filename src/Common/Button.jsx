  const Button = (props) => {
      const {width, text, background, color} = props;
    return (
      <button style={{width: width, background: background, color: color}}>{text}</button>
    )
  }

  export default Button