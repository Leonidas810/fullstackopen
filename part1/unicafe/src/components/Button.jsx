
const Button = ({
    onClick =undefined,
    children
}) =>{
    return(
        <button
        onClick= {onClick ? onClick : undefined}>
            {children}
        </button>
    )
    
}

export default Button;