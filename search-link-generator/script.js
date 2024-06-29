new Vue({
    el: '#app',
    data: {
        searchTermsInput: '坂本龍馬, 高杉晋作, 桂小五郎, 久坂玄瑞, 中岡慎太郎,山縣有朋, 伊藤博文, 杉文, 西郷隆盛, 大久保利通, 篤姫, 黒田清隆, 吉田松陰, 楠本イネ, 福沢諭吉, 中沢琴, 榎本武揚, 嘉納治五郎, 島田虎之助, 武田物外, 男谷信友, 須藤由蔵, 千葉周作, 楢崎将作,楢崎龍, 千葉佐那,大石種次, 岡田以蔵, 中村半次郎, 小笠原清務, 松平容保, 飯塚伊賀七, 宮部鼎蔵, 伊東甲子太郎, 河上彦斎, 伊庭八郎, 田中新兵衛, 相楽総三, 山田浅右衛門, タウンゼント・ハリス, こんぴら狗, 村山たか,井伊直弼, 薄雲大夫,勝海舟, 徳川慶喜, 渋沢栄一, 間部詮勝, 高橋泥舟, 清河八郎, マシュー・ペリー, ラザフォード・オールコック, ジュール・ブリュネ, アーネスト・サトウ, フェリーチェ・ベアト, ロバート・フォーチュン, マーカス・サミュエル, 近藤勇, 土方歳三, 斎藤一, 沖田総司, 永倉新八, 藤堂平助, 山岡鉄舟',
        generatedLinks: [],
        shuffledLinks: [],
        shuffleEnabled: false,
        shuffleButtonText: 'カードをシャッフルする'
    },
    mounted() {
        this.generateLinks();
    },
    methods: {
        generateLinks() {
            const searchTerms = this.searchTermsInput.split(',').map(term => term.trim());
            this.generatedLinks = searchTerms.map(term => {
                const encodedTerm = encodeURIComponent(term);
                return {
                    searchTerm: term,
                    amazonUrl: `https://www.amazon.co.jp/s?k=${encodedTerm}&i=digital-text&s=review-rank&ref_=nav_custrec_signin`,
                    dmmUrl: `https://book.dmm.com/search/?searchstr=${encodedTerm}`,
                    googleUrl: `https://www.google.com/search?q=${encodedTerm}`
                };
            });
            this.updateDisplayedLinks();
        },
        shuffleCards() {
            this.shuffledLinks = [...this.generatedLinks];
            for (let i = this.shuffledLinks.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [this.shuffledLinks[i], this.shuffledLinks[j]] = [this.shuffledLinks[j], this.shuffledLinks[i]];
            }
        },
        toggleShuffle() {
            this.shuffleEnabled = !this.shuffleEnabled;
            this.shuffleButtonText = this.shuffleEnabled ? 'シャッフルを解除する' : 'カードをシャッフルする';
            this.updateDisplayedLinks();
        },
        updateDisplayedLinks() {
            if (this.shuffleEnabled) {
                this.shuffleCards();
                this.displayedLinks = this.shuffledLinks;
            } else {
                this.displayedLinks = this.generatedLinks;
            }
        }
    },
    computed: {
        displayedLinks() {
            return this.shuffleEnabled ? this.shuffledLinks : this.generatedLinks;
        }
    }
});
