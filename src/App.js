import React, {useState, useEffect} from 'react';

function DateTime(props) {
    return (
        <p className="date">{props.date}</p>
    )
}

function Video(props) {
    return (
        <div className="video">
            <iframe src={props.url} frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title={props.url}></iframe>
            <DateTime date={props.date} />
        </div>
    )
}

function VideoList(props) {
    return props.list.map(item => <Video url={item.url} date={item.date} key={item.date} />);
}

export default function App() {
    const [list, setList] = useState([
        {
            url: 'https://www.youtube.com/embed/rN6nlNC9WQA?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-07-31 13:24:00'
        },
        {
            url: 'https://www.youtube.com/embed/dVkK36KOcqs?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-03-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/xGRjCa49C6U?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-02-03 23:16:00'
        },
        {
            url: 'https://www.youtube.com/embed/RK1K2bCg4J8?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-03 12:10:00'
        },
        {
            url: 'https://www.youtube.com/embed/TKmGU77INaM?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2018-01-01 16:17:00'
        },
        {
            url: 'https://www.youtube.com/embed/TxbE79-1OSI?rel=0&amp;controls=0&amp;showinfo=0',
            date: '2017-12-02 05:24:00'
        },
    ]);

    const UpgradeList = WithHoc(VideoList);

    return (
        <UpgradeList list={list} />
    );
}

function WithHoc(Component){
    function DateTimePrety(props) {
        const [list, setList] = useState([]);
        useEffect(() => {
            handleList(props.list)
            .then((arr) => {
                setList(arr);
            })
        }, [])
        return <Component list={list} />
    }
    return DateTimePrety;
}

function handleDate(str) {
    const now = new Date();
    const date = new Date(str);
    const diff = Math.abs(now.getTime() - date.getTime())
    const hours = now.getHours() - date.getHours();
    const mins = now.getMinutes() - date.getMinutes();
    const days = Math.ceil(diff / (1000 * 3600 * 24))
    if (days <= 0) {
        if (hours < 0) return `${mins} минут назад`;
        if (hours === 1) return `${hours} час назад`;
        if (hours > 1 && hours < 5 ) return `${hours} часа назад`;
        if (hours > 20 && hours < 24) return `${hours} часа назад`;
        return `${hours} часов назад`;
    }
    if (days === 1) return `${days} день назад`;
    return `${days} дней назад`;
}

async function handleList(arr) {
    for (let i = 0; i < arr.length; i += 1) {
        arr[i].date = await handleDate(arr[i].date);
    }
    return arr
}


