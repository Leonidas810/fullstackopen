const Notify = ({ type, msg }) => {

    const notifyStyle = { borderRadius: "8px", background: "#ccc", marginBottom: '16px', padding: "16px", border: `4px ${type === 'success' ? 'green' : 'red'} solid`, color: type === 'success' ? 'green' : 'red' }

    return (
        <div style={notifyStyle}>{msg}</div>
    )
}

export default Notify;