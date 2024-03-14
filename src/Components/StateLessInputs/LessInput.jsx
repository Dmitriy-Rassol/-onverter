const LessInput = ({
  type,
  placeholder,
  classes,
  onChangeProps,
  onClickProps,
  propsName,
  value,
  refProps
}) => {

  
  return (
    <input
      type={type}
      name={propsName}
      placeholder={placeholder}
      className={classes}
      value={value}
      onChange={(e) => onChangeProps(e)}
      onClick={onClickProps}
      ref={refProps}
    />
  );
};

export default LessInput;
