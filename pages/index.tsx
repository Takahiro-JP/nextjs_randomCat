import {GetServerSideProps, NextPage } from "next";
import { useState } from "react"; 
import styles from "./index.module.css"

// getServerSidePropsからから渡されるpropsの型
type Props = {
    initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({initialImageUrl}) => {
    // useStateを使って状態を定義する
    const [imageUrl, setImageUrl] = useState(initialImageUrl); // 初期値を渡す
    const [loading, setLoading] = useState(false); // 初期状態はfalseにしておく
    // マウント時に画像を読み込む宣言
    // useEffect(() => {
    //     fetchImage().then((newImage) => {
    //         setImageUrl(newImage.url); // 画像URLの状態を更新する
    //         setLoading(false); // ローディング状態を更新する
    //     });
    // }, []);
    // // ボタンをクリックしたときに画像を読み込む処理
    const handleClick = async () => {
        setLoading(true);
        const newImage = await fetchImage();
        setImageUrl(newImage.url); // 画像URLの状態を更新する
        setLoading(false); // 読み込み中フラグを下げる
    };
    return (
        <div className={styles.page}>
            <button 
                onClick={handleClick} 
                style={{
                    backgroundColor: "#319795",
                    border: "none",
                    borderRadius: "4px",
                    color: "white",
                    padding: "4px 8px",
                }}
            >
                他の猫も見る
                </button>
            <div className={styles.frame}>
                {loading || <img src={imageUrl} />}
            </div>
        </div>
    );
};
export default IndexPage;

// サーバーサイドで実行する処理
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };
};

type Image = {
    url: string;
};

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    console.log(images);
    return images[0];
};
