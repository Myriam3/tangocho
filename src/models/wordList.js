module.exports = {
    getList: (lang) => {
        let data = [];

        if (lang === 'ja') {
            data = [
                {
                    id: 1,
                    word: '関数',
                    labels: ['Programming'],
                    translations: [
                        {
                            id: 11,
                            lang: 'en',
                            word: 'Function',
                        },
                    ],
                },
                {
                    id: 2,
                    word: 'テスト',
                    labels: [],
                    type: 'Noun',
                    translations: [],
                },
            ];
        } else if (lang === 'en') {
            data = [
                {
                    id: 11,
                    word: 'Function',
                    labels: ['Programming'],
                    translations: [
                        {
                            id: 1,
                            lang: 'ja',
                            word: '関数',
                        },
                    ],
                },
            ];
        }

        return data;
    },
};
