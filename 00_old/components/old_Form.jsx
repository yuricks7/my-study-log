export const Form = (props) => {
  const {title, time, onChangeTitle, onChangeTime, onClick} = props;
  return (
    <div className='input-area'>
      <h2>記録</h2>
      <form id="input-history">
        <textarea type="text" value={state.title} onChange={onChangeTitle} />
        <br/>
        <input type="number" value={time} onChange={onChangeTime}/>時間<button onClick={onClick}>追加</button>
      </form>
    </div>
  );
};