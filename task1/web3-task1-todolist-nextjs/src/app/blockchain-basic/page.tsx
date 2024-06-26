"use client";

import React, {useEffect, useState} from 'react'
import Title from "@/components/custom/title";

// 1. 引入markdown-it库
import MarkdownIt from 'markdown-it'
import highlight from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css'
// 2. 生成实例对象
const md = new MarkdownIt(
    {
        breaks:true,
        highlight: function (str, lang) {
            if (lang && highlight.getLanguage(lang)) {
                try {
                    return highlight.highlight(str, {language: lang}).value;
                } catch (_) {
                }
            }
            return ""; // 使用额外的默认转义
        },
    }
);

export default function BloBlockchainBasic() {
    const [htmlString, setHtmlString] = useState('')  // 存储解析后的html字符串

    const markdownText =
        '# Task2 Blockchain Basic' +    '\r\n'+

        '本任务分为简答题、分析题和选择题，以此为模板，在下方填写你的答案即可。' +     '\r\n'+

        '选择题，请在你选中的项目中，将 \`[ ]\` 改为 \`[x]\` 即可' +    '\r\n'+

        '## [单选题] 如果你莫名奇妙收到了一个 NFT，那么' +   '\r\n'+

        '- [ ] 天上掉米，我应该马上点开他的链接' +  '\r\n'+
        '- [x] 这可能是在对我进行诈骗！' +    '\r\n'+


        '## [单选题] 群里大哥给我发的网站，说能赚大米，我应该' +    '\r\n'+

        '- [ ] 赶紧冲啊，待会米被人抢了' +    '\r\n'+
        '- [x] 谨慎判断，不在不信任的网站链接钱包' +    '\r\n'+

        '## [单选题] 下列说法正确的是' +    '\r\n'+

        '- [x] 一个私钥对应一个地址' +    '\r\n'+
        '- [ ] 一个私钥对应多个地址' +    '\r\n'+
        '- [ ] 多个私钥对应一个地址' +    '\r\n'+
        '- [ ] 多个私钥对应多个地址' +    '\r\n'+

        '## [单选题] 下列哪个是以太坊虚拟机的简称' +    '\r\n'+

        '- [ ] CLR' +    '\r\n'+
        '- [x] EVM' +    '\r\n'+
        '- [ ] JVM' +    '\r\n'+

        '## [单选题] 以下哪个是以太坊上正确的地址格式？' +    '\r\n'+

        '- [ ] 1A4BHoT2sXFuHsyL6bnTcD1m6AP9C5uyT1' +    '\r\n'+
        '- [ ] TEEuMMSc6zPJD36gfjBAR2GmqT6Tu1Rcut' +    '\r\n'+
        '- [ ] 0x997fd71a4cf5d214009619808176b947aec122890a7fcee02e78e329596c94ba' +    '\r\n'+
        '- [x] 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' +    '\r\n'+

        '## [多选题] 有一天某个大哥说要按市场价的 80% 出油给你，有可能' +    '\r\n'+

        '- [x] 他在洗米' +    '\r\n'+
        '- [ ] 他良心发现' +    '\r\n'+
        '- [x] 要给我黒米' +    '\r\n'+
        '- [x] 给我下套呢' +    '\r\n'+

        '## [多选题] 以下哪些是以太坊的二层扩容方案？' +    '\r\n'+

        '- [ ] Lightning Network（闪电网络）' +    '\r\n'+
        '- [x] Optimsitic Rollup' +    '\r\n'+
        '- [x] Zk Rollup' +    '\r\n'+

        '## [简答题] 简述区块链的网络结构' +    '\r\n'+

        '\`\`\`' +    '\r\n'+
        '区块链的网络结构通常是点对点的（P2P）。' +    '\r\n'+

        '这意味着不存中心化的服务器或管理机构，每个节点（即参与网络的计算机）都扮演着客户端和服务器双重角色，并直接与其他节点通信。' +    '\r\n'+

        '这种结构确保了数据的分布式存储和计算，从而提高了系统的容错性和抗篡改性。' +    '\r\n'+

        '节点之间通过特定的网络协议传播交易和区块信息，共同维护着区块链的完整性。' +    '\r\n'+
        '\`\`\`' +    '\r\n'+


        '## [简答题] 智能合约是什么，有何作用？' +    '\r\n'+

        '\`\`\`' +    '\r\n'+
        '智能合约是区块链上的一段可执行代码，它们在满足预设条件时自动执行合约条款。' +    '\r\n'+

        '这些合约由计算机程序编写，并在区块链上运行，从而使得合同执行过程透明、可追踪且不可篡改。' +    '\r\n'+

        '智能合约的主要作用是去除或减少中介方的需要，降低交易成本和时间，提高执行效率和信任度。它们在金融、供应链管理、版权保护、自动化执行等多个领域具有广泛的应用潜力。' +    '\r\n'+
        '\`\`\`' +    '\r\n'+


        '## [简答题] 怎么理解大家常说的 \`EVM\` 这个词汇？' +    '\r\n'+

        '\`\`\`' +    '\r\n'+
        'EVM 是 Ethereum Virtual Machine（以太坊虚拟机）的缩写，是一种基于区块链的沙盒环境，用于执行智能合约代码。' +    '\r\n'+

        '它允许开发者在以太坊平台上创建去中心化应用程序（DApps）。' +    '\r\n'+

        'EVM 本质上是一个分布式计算机，它在全球范围内的节点上运行，确保智能合约的执行是透明、一致和不可篡改的。' +    '\r\n'+

        '由于 EVM 的存在，智能合约可以在去中心化的环境中安全地执行，这是以太坊和其他基于 EVM 的区块链平台的核心特性之一。' +    '\r\n'+
        '\`\`\`' +    '\r\n'+



        '## [分析题] 你对去中心化的理解' +    '\r\n'+

        '\`\`\`' +    '\r\n'+
        '去中心化是一种分布式的设计理念，它强调在系统中没有单一的决策点或控制中心。' +    '\r\n'+

        '相反，权力和控制被分散到网络中的多个节点上。' +    '\r\n'+

        '在区块链的语境中，去中心化意味着网络中的每个节点都参与数据的验证、存储和传输，而不依赖于中心化的权威机构。' +    '\r\n'+

        '这种设计增加了系统的透明度、安全性和抗审查性，因为攻击或操纵系统变得更加困难。' +    '\r\n'+

        '去中心化还可以减少单点故障的风险，提高系统的整体健壮性。' +    '\r\n'+
        '\`\`\`'+    '\r\n'+



        '## [分析题] 比较区块链与传统数据库，你的看法？' +    '\r\n'+

        '\`\`\`' +    '\r\n'+
        '区块链和传统数据库各有优势和适用场景，它们之间的选择取决于特定应用的需求。' +    '\r\n'+

        '区块链的优势在于其去中心化的特性，这使得数据一旦写入就几乎不可能被篡改，因此它提供了极高的数据完整性和透明度。此外，区块链的分布式结构使其具有很好的容错性，没有单点故障的风险。智能合约的功能还允许自动执行复杂的业务逻辑，这在某些应用中（如供应链管理、去中心化金融等）是非常有价值的。' +    '\r\n'+

        '然而，区块链的这些特性也带来了局限性，如相对较低的交易处理速度、较高的能耗和存储需求。与传统数据库相比，区块链在处理大量高速交易时效率较低，而且数据存储成本较高。' +    '\r\n'+

        '传统数据库则擅长处理高吞吐量的交易和复杂查询，它们提供了丰富的数据操作功能和高效的读写性能。在需要快速、大规模数据处理的应用中，传统数据库通常是更好的选择。' +    '\r\n'+

        '综上所述，区块链和传统数据库各有千秋，应根据应用的具体需求来选择最合适的解决方案。在某些情况下，甚至可以考虑将两者结合使用，以充分利用各自的优势。' +    '\r\n'+
        '\`\`\`' +    '\r\n'+


        '## 操作题' +    '\r\n'+

        '安装一个 WEB3 钱包，创建账户后与 [openbuild.xyz](https://openbuild.xyz/profile) 进行绑定，截图后文件命名为 \`./bind-wallet.png\`.'


    // 3. 解析markdown语法
    const parse = (str: string) => setHtmlString(md.render(str));

    useEffect(() => {
        parse(markdownText)
        // parse("# 这个是一个一级标题")
    }, [markdownText])

    return (
        <>
            <Title title="Task2：Blockchain Basic QA"></Title>

            <div className="w-full h-[740px] relative z-[1] flex p-8 pb-[150px] overflow-y-auto rounded">
                {/* 将html字符串解析成真正的html标签*/}
                <div className="prose w-full max-w-full " dangerouslySetInnerHTML={{__html: htmlString}}></div>
            </div>
        </>
    )
}
