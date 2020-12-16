<h1> 일정관리 만들어보기 </h1>
<hr />

<h2> Stack </h2>
    <ul>
        <li>react <b>CRA</b></li>
        <li>sass</li>
        <li>react - <del>다양한</del>library</li>
    </ul>

<hr/>
<h2>만들어보는 이유</h2>
<ol>
    <li> 배울려고 <del>뭐이리 배울게 많어요..?</del> </li>
    <li> 어려워서  </li>
    <li> 면접갔다오고 현타와서 </li>
    <li> <strong>놀기 싫어서</strong> </li>
    <li> <b>Fact : </b> <del>그런 이유로 git을 놀리고있어서</del> </li>
</ol>

<hr/>

<h2> 최적화 </h2>

<p>리스트 관련 컴포넌트를 작성할 때는 리스트 아이템과 리스트, 이 두가지 컴포넌트를 최적화 해줘야한다. 그러나 내부 데이터가 100개를 넘지 않거나 업데이트가 자주 발생하지 않는다면,
이런 최적화 작업을 반드시 해줄 필요는 없다.</p>

<h2>함수형 업데이트</h2>

    const [number, setNumber] = useState(0);
    // preNumbers는 현재 number 값을 가리킵니다.
    const onIncrease = useCallback(
        () => (prevNumber => prevNumber + 1),
        [],
    );

<p>
setNumber(number + 1)을 하는게 아닌, 어떻게 <strong>업데이트</strong>할지 정의해주는 함수를 넣어주면,
useCallback을 사용할 때 두번째 파라미터로 넣는 배열에 number를 넣어주지 않아도 된다.
</p>

<h2> useReducer</h2>

            function todoReducer(todos, action) {
        switch (action.type) {
            case 'INSERT': //새로 추가
            // { type: 'INSERT' , todo: {id : 1 , text 'todo', checked: false }}
            return todos.concat(action.todo);
            case 'REMOVE': //제거
            // { type: 'REMOVE' , id:1 }
            return todos.filter((todo) => todo.id !== action.id);
            case 'TOGGLE': //토글
            // { type: 'REMOVE', id : 1 }
            return todos.map((todo) =>
                todo.id === action.id ? { ...todo, checked: !todo.checked } : todo,
            );
            default:
            return todos;
            }
        }

<p>useReducer를 사용하는 방법은 기존 코드를 많이 고쳐야 한다는 단점이 있지만,
상태를 업데이트하는 로직을 모아서 컴포넌트 바깥에 둘 수 있다는 장점이 있다.</p>
