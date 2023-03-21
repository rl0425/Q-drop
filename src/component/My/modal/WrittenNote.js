import classes from "./WrittenNote.module.css"

function WrittenNote(){

    const data = [
        {
            "id": 14,
            "title": "취업은 언제할수있을까?",
            "content": "이러쿵 저러쿵이러쿵 저러쿵 이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵 이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵",
            "mainCategory": {
                "main_category_name": "디자인",
                "main_category_id": 2
            },
            "subCategory": {
                "sub_category_id": 3,
                "sub_category_name": "Java/Spring"
            },
            "board_like": {
                "total_like_count": 1,
                "user_like_status": true
            },
            "member_info": {
                "profile_img": null,
                "nickname": "성우"
            },
            "bookmark_info": {
                "user_bookmark_status": false,
                "total_bookmark_count": 0
            },
            "createTime": "2023-03-11T17:30:35",
            "approval":1,
            "author": false
        },
        {
            "id": 13,
            "title": "ㅁㄴㅇㅁㄴㅇㅁㄴ",
            "content": "이러쿵 저러쿵이러쿵 저러쿵 이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵 이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵",
            "mainCategory": {
                "main_category_name": "디자인",
                "main_category_id": 2
            },
            "subCategory": {
                "sub_category_id": 3,
                "sub_category_name": "Java/Spring"
            },
            "board_like": {
                "total_like_count": 1,
                "user_like_status": true
            },
            "member_info": {
                "profile_img": null,
                "nickname": "성우"
            },
            "bookmark_info": {
                "user_bookmark_status": false,
                "total_bookmark_count": 0
            },
            "createTime": "2023-03-09T17:30:35",
            "approval":0,
            "author": false
        },
        {
            "id": 12,
            "title": "12 12 12 12",
            "content": "이러쿵 저러쿵이러쿵 저러쿵 이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵 이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵",
            "mainCategory": {
                "main_category_name": "디자인",
                "main_category_id": 2
            },
            "subCategory": {
                "sub_category_id": 3,
                "sub_category_name": "Java/Spring"
            },
            "board_like": {
                "total_like_count": 0,
                "user_like_status": false
            },
            "member_info": {
                "profile_img": null,
                "nickname": "성우"
            },
            "bookmark_info": {
                "user_bookmark_status": false,
                "total_bookmark_count": 0
            },
            "createTime": "2023-03-08T17:30:35",
            "approval":2,
            "author": false
        },
        {
            "id": 9,
            "title": "99999999999999",
            "content": "이러쿵 저러쿵이러쿵 저러쿵 이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵 이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵",
            "mainCategory": {
                "main_category_name": "디자인",
                "main_category_id": 2
            },
            "subCategory": {
                "sub_category_id": 2,
                "sub_category_name": "백엔드"
            },
            "board_like": {
                "total_like_count": 0,
                "user_like_status": false
            },
            "member_info": {
                "profile_img": null,
                "nickname": "성우"
            },
            "bookmark_info": {
                "user_bookmark_status": true,
                "total_bookmark_count": 1
            },
            "createTime": "2023-03-05T17:30:35",
            "approval":1,
            "author": false
        },
        {
            "id": 3,
            "title": "2222222222222222",
            "content": "이러쿵 저러쿵이러쿵 저러쿵 이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵 이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵",
            "mainCategory": {
                "main_category_name": "개발",
                "main_category_id": 1
            },
            "subCategory": {
                "sub_category_id": 1,
                "sub_category_name": "프론트엔드"
            },
            "board_like": {
                "total_like_count": 2,
                "user_like_status": true
            },
            "member_info": {
                "profile_img": null,
                "nickname": "성우"
            },
            "bookmark_info": {
                "user_bookmark_status": false,
                "total_bookmark_count": 0
            },
            "createTime": "2023-03-13T17:30:35",
            "approval":0,
            "author": false
        },
        {
            "id": 4,
            "title": "44444444444",
            "content": "이러쿵 저러쿵이러쿵 저러쿵 이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵 이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵",
            "mainCategory": {
                "main_category_name": "개발",
                "main_category_id": 1
            },
            "subCategory": {
                "sub_category_id": 1,
                "sub_category_name": "프론트엔드"
            },
            "board_like": {
                "total_like_count": 0,
                "user_like_status": false
            },
            "member_info": {
                "profile_img": null,
                "nickname": "성우"
            },
            "bookmark_info": {
                "user_bookmark_status": true,
                "total_bookmark_count": 2
            },
            "createTime": "2023-03-09T17:30:35",
            "author": false,
            "approval":1,
        },
        {
            "id": 1,
            "title": "Personal Marketing이란 무엇일까?\r\n",
            "content": "개인의 취향과 니즈에 맞추어 하는 마케팅의 한 종류 로 어쩌구 저쩌구 어쩌구 저쩌구어쩌구 저쩌구 어쩌구 저쩌구어쩌구 저쩌",
            "mainCategory": {
                "main_category_name": "개발",
                "main_category_id": 1
            },
            "subCategory": {
                "sub_category_id": 1,
                "sub_category_name": "프론트엔드"
            },
            "board_like": {
                "total_like_count": 0,
                "user_like_status": false
            },
            "member_info": {
                "profile_img": null,
                "nickname": "기찬"
            },
            "bookmark_info": {
                "user_bookmark_status": true,
                "total_bookmark_count": 1
            },
            "createTime": "2023-03-10T17:30:12",
            "author": false,
            "approval":0
        },
        {
            "id": 2,
            "title": "222222222",
            "content": "이러쿵 저러쿵이러쿵 저러쿵 이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵 이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵이러쿵 저러쿵",
            "mainCategory": {
                "main_category_name": "개발",
                "main_category_id": 1
            },
            "subCategory": {
                "sub_category_id": 1,
                "sub_category_name": "프론트엔드"
            },
            "board_like": {
                "total_like_count": 2,
                "user_like_status": true
            },
            "member_info": {
                "profile_img": null,
                "nickname": "성우"
            },
            "bookmark_info": {
                "user_bookmark_status": false,
                "total_bookmark_count": 1
            },
            "createTime": "2023-03-12T17:30:35",
            "approval":1,
            "author": false
        }
    ]

    return (
        <div className={classes.box}>
            <div className={classes.head}>
                <img src={"/images/icons/prevBtn.png"}/>
                <span>내가 쓴 노트</span>
            </div>
            <div className={classes.body}>
                {data.map((ele) => {
                    return (
                        <div className={classes.content}>
                            <div className={classes.contentHead}>
                                <img src={ele.approval === }/><span></span>
                            </div>
                            <div className={classes.contentBody}>
                                <div><span>Q. {ele.title}</span></div>
                                <div><span>{ele.content}</span></div>
                                <div><span>{ele.subCategory.sub_category_name}</span></div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default WrittenNote
