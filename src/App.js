import React, { useEffect, useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { connect } from "./redux/blockchain/blockchainActions";
import { fetchData } from "./redux/data/dataActions";
import * as s from "./styles/globalStyles";
import styled from "styled-components";

const truncate = (input, len) =>
  input.length > len ? `${input.substring(0, len)}...` : input;

export const StyledButton = styled.button`
  padding: 10px;
  border-radius: 50px;
  border: none;
  background-color: var(--secondary);
  padding: 10px;
  font-weight: bold;
  color: var(--secondary-text);
  width: 100px;
  cursor: pointer;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const StyledRoundButton = styled.button`
  padding: 10px;
  border-radius: 100%;
  border: none;
  background-color: var(--primary);
  padding: 10px;
  font-weight: bold;
  font-size: 15px;
  color: var(--primary-text);
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  :active {
    box-shadow: none;
    -webkit-box-shadow: none;
    -moz-box-shadow: none;
  }
`;

export const ResponsiveWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: stretched;
  align-items: stretched;
  width: 100%;
  @media (min-width: 767px) {
    flex-direction: row;
  }
`;

export const StyledLogo = styled.img`
  width: 200px;
  @media (min-width: 767px) {
    width: 200px;
    padding-top: 50px;
  }
  transition: width 0.5s;
  transition: height 0.5s;
`;

export const StyledImg = styled.img`
  box-shadow: 0px 5px 11px 2px rgba(0, 0, 0, 0.7);
  border: 4px solid var(--secondary);
  background-color: var(--accent);
  border-radius: 100%;
  width: 200px;
  @media (min-width: 900px) {
    width: 250px;
  }
  @media (min-width: 1000px) {
    width: 300px;
  }
  transition: width 0.5s;
`;

export const StyledLink = styled.a`
  color: var(--secondary-text);
  text-decoration: none;
`;

function App() {
  const dispatch = useDispatch();
  const blockchain = useSelector((state) => state.blockchain);
  const data = useSelector((state) => state.data);
  const [claimingNft, setClaimingNft] = useState(false);
  const [feedback, setFeedback] = useState(`Click buy to mint your NFT.`);
  const [mintAmount, setMintAmount] = useState(1);
  const [CONFIG, SET_CONFIG] = useState({
    CONTRACT_ADDRESS: "",
    SCAN_LINK: "",
    NETWORK: {
      NAME: "",
      SYMBOL: "",
      ID: 0,
    },
    NFT_NAME: "",
    SYMBOL: "",
    MAX_SUPPLY: 1,
    WEI_COST: 0,
    DISPLAY_COST: 0,
    GAS_LIMIT: 0,
    MARKETPLACE: "",
    MARKETPLACE_LINK: "",
    SHOW_BACKGROUND: false,
  });

  const claimNFTs = () => {

    let cost = CONFIG.WEI_COST;
    let gasLimit = CONFIG.GAS_LIMIT;
    let totalCostWei = String(cost * mintAmount);
    let totalGasLimit = String(gasLimit * mintAmount);
    console.log("Cost: ", totalCostWei);
    console.log("Gas limit: ", totalGasLimit);
    var whitelisted = ["0x5e3810196Ab6985af2602Ef38535E757d47C4042", "0xc41cf38cfb4ff5c1e493478e6d7669c38abd2c3a", "0x6866C1FcC94C089EA7978c377886B043eA1c8234", "0x0dbc4E7906E85156D0aB57306a31a3d21490b5F6", "0x7c0F8862b4a70b7297fc04620E9266435efffd50", "0x5C8B4fBc0212f04309bbBeb1D479B1F1B3AF62f8", "0xBFfd6e21Ba1C8Ac464D4fd301220F6472bCFC93b", "0xdc39438d56FAb57Ea8993c324a01BEc06aA56e12", "0xfF6625DFf78d998833e12ACF77bc8Db419AFB6DA", "0xe1C22727f4fdf12f335FF2F53C1A94cE76f1588c", "0x0178865d91039b03d694b627F19111274627E1A5", "0x2E0fA8F0e400466Bf29574c6c549AA05F962400a", "0x63B64D2e3411E185Fd061a269fB7239BB859022D", "0xb1505fE87A026A3710b7912e7c0B7fD3Fe82D206", "0x30fb6c20967ef5a56846163f17e1a6296b956012", "0xB963d49474b46d88D95C9004a0C8DF22346382B3", "0x538E863C797B615B621299Ab118238b85A0D38c8", "0xd4c2Dc66264fae3167E8Ef0274cB6F468957a709", "0x78185b14aCa71d958D4De7a11dE7a3215CaF7f29", "0xD9B5e8914b9DcaeD39f0c0dE1AB592cf2c4f23cE", "0xB8622Ae3897bF4fD112e9d8607030C1A8F484907", "0xB8622Ae3897bF4fD112e9d8607030C1A8F484907", "0xFCB9778F3BEb0367042f547b13e01110708e03fd", "0xE8bffd6A39389A9D6B0f64B5E7B205521680BDEE", "0xE8bffd6A39389A9D6B0f64B5E7B205521680BDEE", "0xE5DDE651328c541569dcEE1Ce5619DF74D36A44f", "0xd816C0901C3E17C84986ea7D43A2d27224E7a329", "0x90a633F3BA2950e356DD1eC3908A433C9Fba6C30", "0x0F467128ebb396079daA030d08b663A8D1edeEEa", "0x78A4E3F60d7352bdcF4b2FCBECd23323450d86c8", "0xc882285901959F898329A9754267813d3D464E4B", "0x863502553e07b662b0E7502a2232A839bE0Ace2F", "0x280D7087f158114E2da78803518Fb5068678033a", "0x0cDA1dC706F432B601168bCdBDC8483608a71d30", "0x26aFB37Fb033368056db35018904A91c5961EFBC", "0xe1ad3Ba97dd837696dD06939D7088CDFBBDF3809", "0x60cb03B643eCCACc5D4a266ED0ffCE657C8870b8", "0x303eec8237de9d147cf0959e0fb1cd64847b37da", "0xe57b3454c2594db5245395e719571bbc4f982b0a", "0x11c943e0d53531c136bd0eebd7ce348660129518", "0xde9eb4a2c7c0fb1463850a882206b090cc8f06bc", "0x5ccd379327dab51dec313ef1fdd75b3e1832b7d1", "0x149e6d252bac35b0e975c6501244cb2ba9be267a", "0xf55b713bfc6cced6a10fc5e79d6c181e38b8a884", "0xc565b88d736a4c1cbce48ad152ab7288827c12a7", "0x1b81141c5929980804bceb20f9cde1e394da8320", "0x5cc2cbfdbdc237003d100b8f1dfb24530b77bc85", "0x8003674d3c813bf73f365856b1dd93791871b930", "0x06f54a8233c1982bac93a83dfcea073ff2cfd165", "0x0ca1fef32b1a17729c0da522f5e5e4c203f088aa", "0xc841e0e12d12ada9618d1e0a8ee49498cc16ca33", "0x943fc7a9e8df88ba74764f439d1aea5892a09098", "0x2b8550d8787150d42bd0eaaebfde07a912ac6c07", "0xa724429ea9c3d39536dccebd0986adf18d69f107", "0x65e2bb0d9c2ff7caed79db817feba0cc0b0ea40a", "0x71b19ce9e0f74bd348f04b4e4e1914e40bb37e57", "0xa6a78f1b4686393f0306cd007fcda50772ceacaf", "0xcca6851f53256c5fc846fe49578ef00c6837c6a3", "0xea077272d7495c13edca4f8fdf07cdbfed6fb8c5", "0xb6dc765714154652b0d7e6723448c81da1a98509", "0x969f0c47699f230fbfd4efa28c3df398c0fa453f", "0xf12c121b7b245a826d4115d856f417e09ef2b9ce", "0xb0f6ce697f74a76a44afc3ec366d800f36f8b529", "0x013225c20b79d6227fb42ad295ba960014cd0ec9", "0x752b7b812a88bebbb3167fe3ceb0e6137d53c56b", "0x7b18358ecb5559e84c8f2895f01f53b17b1897a4", "0x9882fdf117d2979adc93d47a4d642524eb3e33b6", "0x991cc6612bf0d5d4e3d7339bb2797c7a3170d931", "0x7882ddf68b279425393c79187fa8aefc38374318", "0x9a88b9872e0e77e0062cce008227da364fad998d", "0xc927e34bb80fbc2a1aa2198041b6b20b27363051", "0x960847c0cfc75a1fbb1672cb6f94bb549dec067f", "0x96854dc2a94ef6cb90b4cbf39f931a3508f84185", "0xc04ecf601c1fb8d6fea535499d4963e03c446799", "0xd075b729f5e17da0b714e7fa34850c22a5ac2335", "0xc881b4985de1410697015363b855c1bcf7b5f264", "0xc1b15ceb1bcad3da50c50eff13c8825aff99ff58", "0x085200a5d283a4c711543bd4ae97dab4fc39339c", "0x190775f89483f96bffa66d2f46bf1cdd9b35e11f", "0x1ab70250f943278780e02d7c0b440dce19672826", "0x26ee01ae8c2869ae04ce6079d172d7e57c1330f8", "0x3079694f06fb893efde9b238cace61d07f400bf8", "0x38e4ff60567b657ec4980fb56a391dce5e2f2b3a", "0x56b77ffd4525a1966edddaafedad83b1f6e368d3", "0x66386050311a1fb23e2cf8a253420558dd28766e", "0x818907a3b1af1c7ca36db7c0f8fe65d8c49aa728", "0x86a22687d431f0d992188aca6847e47d96982aab", "0x8903bb44e659bb99db92194a06d56e0185a7d0f3", "0xb9c24a05b14add8c0f6ae0581844c7d7e737b2da", "0xd832eee5c7441f909d07b8b2dd8acc3e3928b4f4", "0xe2923e1b6694c6446cfc7c0d3071d7bd698ed6d3", "0xe9e1c103d3f799a21f6585c8f670997b0da49eb2", "0xeac981789ec515443ca4b54870f3994203dc48f0", "0x0621a2f93e8aac8b45d72586d1c63fd936bd9d87", "0xcc72e4fb0e34b133f9c73b8984b016fe91647d00", "0x8a17abd1c7396741cf870749d2622235f94333e1", "0x15030013e3a6d9ba62eeacd691dd24398419217a", "0x7282b02bd7bd06c446e140e3c86c1543fe3aa498", "0xf2915e222453773b2a7f88a4ea5fe2886b8a32c7", "0x08962782ec433979be4c6af24a7c4885cf5607fb", "0x0ed15c74370b88c9c141ed451b0305064047fa9d", "0x2d632ce92f7d2b2d061945cadb7f92fa4bef79e4", "0x8d6fe4d9557c0aab2a9206eb652e8243fc4e864a", "0xcb595d578451c3ea9af9f7c4a6ed0b6d3d9448dc", "0x7e172e45902b8882ec808c9a1c59c13d544d291d", "0x23ca9523c74f2fb8047989addb13375ed0d2c623", "0x341ad50e743ba4fb91607d343b295192bbefc7cf", "0x3adf3461143b09a5c27ddc7db2ce71cad7135688", "0x3b3f389d556acf95b011a09a0c3fd970589f039e", "0x91a283ba6f242371308defc4b696500ed97b97f5", "0x9871d929c13e4ccaa227f4241f1fe96c8a1d6740", "0x9a30c61f1f7480f3ac34579f08f6334f451dfbc9", "0x9d86ce4ea939ba71bb97383b85afd12d3b3bbcaf", "0xa699295afeceb97632ef78ddb3d6757976d97d9e", "0xbfa485ac315ec8620c4a47a4d16b9515241c681d", "0xdba17d91fd2839374f29ae77d7eb846b0abadaf3", "0xdc029116505fdcfd1f528e2708aadbb77b3e520c", "0xe616636373a4850529532ba1cddace920253fba5", "0xf5ab3da94a4db7b81d02afd2e19adc4397b2c14c", "0xf66321546f55e22186b235faefb5287b12bddec9", "0xf69824085d4cfda4d7b4da83d84b6b17e85ed3e5", "0x10ea73e3ed76281ef97eb2aa5e768b4d42a9409f", "0x63e4198249fc4b3b948b549033e5246dd53ff122", "0xb62255c8ab7df53b7c497433d22bffb397bf58be", "0xbf3a18a372ec02f57062f33d219734275049b6fe", "0x130493ad7bb9ab3829eba8a85867c62c7a018cbd", "0xee619502bc5e04e0222d775890451021c7b18768", "0xf74eddf6a75f2afe2c4b211f7a9de6729cd860e4", "0x611500afee8593b1385e39e6917e03f6b4298a00", "0x1aa7625e9ef252647c82941eeae1a1753441a64f", "0x605dbbdf0206a29d3b49972f48bacccb5c5268f6", "0xb77e5574b42a09cb121da2499f8e1e61896542b0", "0xcb09bd7ce8dadc2b7faaf189a91d8999cf347c21", "0x19c2ec706e7245c32a6918406ca4dcc6c8a8a6fc", "0x58cf85e27f004316af80e9acd2ee92fe40685f9e", "0x5c6042f3aeecbe9bb83a4bef04abbc0e75675098", "0x6681e3dac3971c4d3da3b0a13e1f3f3f3d741e3d", "0x677074435dc63d8060c4110b119b56ad0d2d8547", "0x77c7c6ce15cf57529f92ba99223eaf745bb63eef", "0x938e827b3196804817a5a31caf21b11ba9929caa", "0x99e09d15d90db8bf4edd50f10eae6af6a3105ff8", "0xae81aa0862f3a3ccf296db268195fcd18baa3353", "0xbef71e863a6e627cb01f89555437c48298cd7959", "0xcce2945abaeacf7da1abe24575c0d3b6f96fb2bf", "0xd960a33471a72a7fffdf7987815da76090e5ec21", "0xe22cd3db5a2ac6400611f1391020bab4afccb522", "0xff76c8d6ee49b6b2f4347d86d4bc87d577fe3856", "0x4d1f350ca2dc1633d917e807d40695c3086c26a3", "0x5e8adec7ee32cadea282648b9f76ae46cde251c4", "0x69f336a405c9a778da0940aa223212b70c9e9373", "0x79bf94aa1b847609bac9a9982d46bd30a07eff69", "0x7a530c81b7c1c1ce787585f885d6f30aca7b8753", "0x7a90e2806004aeb647f054754cbc24316f21c3a9", "0x88a2845ceca8a567b040d74d310b7846ee1ed874", "0x8c5da24afcdd9d5a8c2de218b5e081122cfffe9c", "0x943db9a2caf196fc04989d84aafb3179ea3596bf", "0xbb8aa8c19835fd828c225914b1c62b974893ea5a", "0xbfa5c205a1fa6c33a8de1f77de80bf0a46bce09c", "0x05b728fd472f6530dea5b3fb038b4e2fe39d04d0", "0x15b4c8ee2aca3eeebb3b5de311d659d2fb5736fa", "0x3876ab30fa2da8d35bc0f687c954cf116f2ea5da", "0x417339aaabc69bae824a044f33d5d1b433f30885", "0x4b372a89f9782d013ff8c3f58541a7b2416fb208", "0x5c8003d44f8278b20a508cb432b1e15dffbc30dc", "0x7ab5d5e435cd0e9629a76f7c1ab8867d66b7e835", "0x9a8caa10cf420c72628b05315b588269ae550dc1", "0xaa58bf08832222531cb7ec200b0e86e4b29d1cad", "0xaa6a62aac4898fce951e122a9b0bbb662bbc394b", "0xe0b9286cfa4f10b1956f837a09d1e6ab8c5312ef", "0xf1f5d35c46fd62fdd9150c39acc4a1b6a8327ae4", "0xfdf4e446eef1116bbd30bb22fb80cfcb49ec4813", "0xfed8d5d9e14938043be42dbef95625045861dbfd", "0x12a088d63f3c50e75a3d1d5c1b64ecedd0abc368", "0x163f997fedc709791a0d0b98c15f114423bf3494", "0x1a379c77a3439a50ad4c59480ce7add32b92902e", "0x1a8566953bcc2f6ededd7b9ad40d799c1233abce", "0x207fc0de1e44910b9ad67a18e509f1f9309b3243", "0x239fe9a95c121b9b8413eecd44344a330207905d", "0x24d7f81b10b54e202b2c5bab077e6f695514a97e", "0x3050d3e4d7ad7bf280d78eb69ecf4b9957cffa6c", "0x390b0c02221d3ce00ab4edf061898555ad0b5983", "0x3fba528a8f3716193bbaa0ef8d1c9b10184a3b1b", "0x4f45232872fad3430e18678a0f16fe247fdf6ebd", "0x544824db645bb450aa68cd08e99e9979b11e1cf4", "0x624779b38aedbb7d18a00c3caf0e2359a5598f33", "0x635227e1c6a2f50ef5a5cb93cbf0731e25169528", "0x6403cd11ee61c7b7a11bbb7eec57576f9050260e", "0x665db16905d8ebae23f215e7ed034d29b9d2b85d", "0x67c65e287006c74c7545a18955429aabde6ca2c9", "0x68af0b59aec9c50794a1aff061143ccbf1ccb1e0", "0x6bef6defbb70028ccf546934f402a29d6f79802c", "0x6e8424037269e3d72d0013dbbbfce9f273d0c47b", "0x74ac378543c37ca9bb0ac919857781763bd87275", "0x81becd040f1de9847fabee20463cdb109d695508", "0x93feaa58ffd4a2c3e2d207b22397ad9cf6bac49b", "0x97d61de26849949ce43e262f2e0246f2945fcf69", "0x9ffefa8f15d1fe732f38766b099ac8b212263ddb", "0xa6e01a1c819a71b86b8810dd038c015dab7e0d9b", "0xbb156ec681fb7b5dbe1898d79812043d3e8541e3", "0xbca697ba0a9a4efb00e73b6c53abd8bb3b77cd7f", "0xbce8f63a0816a0122d0e890c7af2daae60800052", "0xd920ece3b310c6bbf67d6c2a6d35073e0b8e5b34", "0xe37ab9a105a5ae3022b777b9f7658fcf65592fd8", "0x026d70f0f03549afaec5a2eef043e2b1e4122753", "0x0b19367b04637198ccddbb52b54ef14a3971049f", "0x0e11bc781f7e07d43bb436b598276e6e46f5040d", "0x12f4d99a7249e194a0b7990a3db41546cc1b1a7c", "0x1524b05155311d1387a88c66e76bf2fdea4ec2f4", "0x1583a435897b38adac501d1463adbcad6b2ecdd8", "0x196e0618fa3ae9e494fa2b93f0adb18a5c8607a9", "0x2bde2d294d7c775ba37e7b18be40d635a71e8349", "0x2cd20be6727cd9d787fd76d45d2d80fb1cb33c5b", "0x2dab2f6c718a1c43fa188ecf7edaf30581eb8000", "0x31622091b2ddde1c0b6c81138a966d5a65f45aec", "0x38385f266df18787dcc8cb52b52f697e218debf7", "0x3d61fb961bc445ed0d14d201a09d953c42ea9995", "0x3fc36ade615bf6e4581a6cf91b80fd46165cbdba", "0x4017b0eb597dc7edd799315cdd359a2cb81305a7", "0x40cc5bf572304645aceaf35ee03d37bfc68f929f", "0x4208710f4e827fd26fb89d91978142b50dbd8c50", "0x431e4c86c0924b07080c5ae95ce51b7ccdad5dd7", "0x4ad69323de3ae3d0bbc654ff30b0d3c347446424", "0x4c9830050e52cb8b73c3be77d926b8cce60312b8", "0x4cfdf63c798a985ca552c1040501a80cabc76933", "0x4dc67833613678e04fb532504a9df53c359f59d9", "0x53aa365090897ccb089e1b39ef28580b6f5f9898", "0x6665a160bc86e104cf1677478fdecbb6cb53a976", "0x6892398a3b6f82eae80a02e54b2133c33b55b85e", "0x6ab7787c0997cf2837cc2131c2ad83ab2626e7e3", "0x6da13d518e404f6557482238761c80072d1a9aa7", "0x6e4f396a89f96d73b43cd6a5745ddb0e44698352", "0x6f4784b4479d9e8438f7bc4db0887b7c1907276b", "0x6fa04a05379d5da8d1ee649e010671a477c76baa", "0x77b2ce7ad940747a32963fdb151983d889abfca6", "0x7bf1e8d5d98a9cc502481a39c43c9ec7a205a5f4", "0x7c2ce45987722255d22ff21debb45c27143a5ea7", "0x7dcf85cbfdf2d0aecdb18e47499d04579b14c8a3", "0x83a87e68acd0465ecba01d429526f3d483d47f07", "0x855dd2b93b2c06ae049a542a787912e41a046bff", "0x8ab1d3f6f9688163777b4d3d7f5707065cb8f38a", "0x8cf61e409b9b90c1dfa12d35810f7711371ab68a", "0x94941da39216876cf99ade8e1d10f2f45406c5be", "0x94d465f176717731e627dd6f745c30d29acdaa64", "0xa0f050ab0145fcd50d491f8f866a35dcfd4c80d8", "0xa2efba31b962ae130c4ea9446ef09a080e4129db", "0xa6852d4b04b7c118d15056dce8fb489de5e13236", "0xa972fa682857aacfb91b16136165525cd9e1f834", "0xad6637f679c7b733546eb591b9a636ac833787a0", "0xad80ace2c58467272bec6c5470cdc951e92b21b4", "0xb18e416687710bd98f5d73d742f88a178e6cf93c", "0xc138ce6063f4b3bda51b6f76fee516d06b66c7de", "0xc56fb68019430028672a51fc1dfa959c8897c4a5", "0xca169eb5a8fdc3c226c5b3bca36209f45c2a921b", "0xce0e64063d5086ce1e021684845a58f401adc3f3", "0xcfad7a0152c2000cb93251172494cc52034774a1", "0xd1ae58ad3e81229af19d053578e6518cc3c478ef", "0xd5e53654cab560cdc6aa49ecc0f1074f8ad88fab", "0xd73a62f9e584f40ef25b9a873be0eca6c7ebf622", "0xe85165d16a7145f0c6674539f7779894a26c63b9", "0xeb5dbc2311c77c373d76245c69504d6ac5456a26", "0xecf48f983f184f68cb8b892894ba4d1b4b88c47c", "0xeebf29bc5582e285ef6d648dcf30f4ccaf7fe081", "0xefef67e47db9298b8055e04e199f328d7c4946e2", "0xf377faf01b57cfdd1caa7d2c54433071a5348ff7", "0xf8436c23d0d7967745fbbdd7eac2117d949222a3", "0xfd8ccb30924b0a352887ce60d3aa2375192e0e5f", "0xfdc30a4874c369e6cf36cab1168d119c704d0abc", "0xfe64438366c0c164243e9221048a9355ee623cc1"
];

    for (var iaddress = 0; iaddress < whitelisted.length; iaddress++){
      
    if(blockchain.account = whitelisted[iaddress]) {
   
    setFeedback(`Minting your ${CONFIG.NFT_NAME} you must be whitelisted or it'll fail`);
    setClaimingNft(true);
    blockchain.smartContract.methods
      .mint(mintAmount)
      .send({
        to: CONFIG.CONTRACT_ADDRESS,
        from: blockchain.account,
        value: totalCostWei,
      })

      .then((receipt) => {
        console.log(receipt);
        setFeedback(
          `WOW, the ${CONFIG.NFT_NAME} is yours! go visit Opensea.io to view it.`
        );
        setClaimingNft(false);
        dispatch(fetchData(blockchain.account));
      });} 

      else {
        setFeedback("Sorry, This addres is not Whitelisted .");
        setClaimingNft(false);
    } 


  };


  };

  const decrementMintAmount = () => {
    let newMintAmount = mintAmount - 1;
    if (newMintAmount < 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const incrementMintAmount = () => {
    let newMintAmount = mintAmount + 1;
    if (newMintAmount > 1) {
      newMintAmount = 1;
    }
    setMintAmount(newMintAmount);
  };

  const getData = () => {
    if (blockchain.account !== "" && blockchain.smartContract !== null) {
      dispatch(fetchData(blockchain.account));
    }
  };

  const getConfig = async () => {
    const configResponse = await fetch("/config/config.json", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    const config = await configResponse.json();
    SET_CONFIG(config);
  };

  useEffect(() => {
    getConfig();
  }, []);

  useEffect(() => {
    getData();
  }, [blockchain.account]);

  return (
    <s.Screen>
      <s.Container
        flex={1}
        ai={"center"}
        style={{ padding: 24, backgroundColor: "var(--primary)" }}
      >
        <a href={CONFIG.MARKETPLACE_LINK}>
          <StyledLogo alt={"logo"} src={"/config/logo.png"} />
        </a>
        <s.SpacerSmall />
        <ResponsiveWrapper flex={1} style={{ padding: 24 }} test>
          <s.SpacerLarge />
          <s.Container
            flex={2}
            jc={"center"}
            ai={"center"}
            style={{
            }}
          >
            <s.TextTitle
              style={{
                textAlign: "center",
                fontSize: 50,
                fontWeight: "bold",
                color: "var(--accent-text)",
              }}
            >
              {data.totalSupply} / {CONFIG.MAX_SUPPLY}
            </s.TextTitle>
            <s.TextDescription
              style={{
                textAlign: "center",
                color: "var(--primary-text)",
              }}
            >
             
            </s.TextDescription>
            <span
              style={{
                textAlign: "center",
              }}
            >
              <StyledButton
                style={{
                  margin: "5px",
                }}
                onClick={(e) => {
                  window.open(CONFIG.MARKETPLACE_LINK, "_blank");
                }}
              >
                {CONFIG.MARKETPLACE}
              </StyledButton>
            </span>
            <s.SpacerSmall />
            {Number(data.totalSupply) >= CONFIG.MAX_SUPPLY ? (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  The sale has ended.
                </s.TextTitle>
                <s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  You can still find {CONFIG.NFT_NAME} on
                </s.TextDescription>
                <s.SpacerSmall />
                <StyledLink target={"_blank"} href={CONFIG.MARKETPLACE_LINK}>
                  {CONFIG.MARKETPLACE}
                </StyledLink>
              </>
            ) : (
              <>
                <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  1 {CONFIG.SYMBOL} costs {CONFIG.DISPLAY_COST}{" "}
                  {CONFIG.NETWORK.SYMBOL}.
                </s.TextTitle>
               <s.TextTitle
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                </s.TextTitle>
                <s.SpacerXSmall />
                <s.SpacerSmall />
                {blockchain.account === "" ||
                blockchain.smartContract === null ? (
                  <s.Container ai={"center"} jc={"center"}>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      Connect to the {CONFIG.NETWORK.NAME} network
                    </s.TextDescription>
                    <s.SpacerSmall />
                    <StyledButton
                      onClick={(e) => {
                        e.preventDefault();
                        dispatch(connect());
                        getData();
                      }}
                    >
                      CONNECT
                    </StyledButton>
                    {blockchain.errorMsg !== "" ? (
                      <>
                        <s.SpacerSmall />
                        <s.TextDescription
                          style={{
                            textAlign: "center",
                            color: "var(--accent-text)",
                          }}
                        >
                          {blockchain.errorMsg}
                        </s.TextDescription>
                      </>
                    ) : null}
                  </s.Container>
                ) : (
                  <>
                    <s.TextDescription
                      style={{
                        textAlign: "center",
                        color: "var(--accent-text)",
                      }}
                    >
                      {feedback}
                    </s.TextDescription>
                    <s.SpacerMedium />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledRoundButton
                        style={{ lineHeight: 0.4 }}
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          decrementMintAmount();
                        }}
                      >
                        -
                      </StyledRoundButton>
                      <s.SpacerMedium />
                      <s.TextDescription
                        style={{
                          textAlign: "center",
                          color: "var(--accent-text)",
                        }}
                      >
                        {mintAmount}
                      </s.TextDescription>
                      <s.SpacerMedium />
                      <StyledRoundButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          incrementMintAmount();
                        }}
                      >
                        +
                      </StyledRoundButton>
                    </s.Container>


<s.SpacerMedium />
                        
<s.Container ai={"center"} jc={"center"} fd={"row"}>
<s.TextDescription
                  style={{ textAlign: "center", color: "var(--accent-text)" }}
                >
                  1 Free Max Per WL
                </s.TextDescription>
                    </s.Container>


                    <s.SpacerSmall />
                    <s.Container ai={"center"} jc={"center"} fd={"row"}>
                      <StyledButton
                        disabled={claimingNft ? 1 : 0}
                        onClick={(e) => {
                          e.preventDefault();
                          claimNFTs();
                          getData();
                        }}
                      >
                        {claimingNft ? "BUSY" : "BUY"}
                      </StyledButton>
                    </s.Container>
                  </>
                )}
              </>
            )}
            <s.SpacerMedium />
          </s.Container>
          <s.SpacerLarge />
        </ResponsiveWrapper>
        <s.SpacerMedium />
        <s.Container jc={"center"} ai={"center"} style={{ width: "70%" }}>
          <s.TextDescription
            style={{
              textAlign: "center",
              color: "var(--primary-text)",
            }}
          >
            Please make sure you are connected to the right network (
            {CONFIG.NETWORK.NAME} Mainnet) and the correct address.
          </s.TextDescription>
          <s.SpacerSmall />
        </s.Container>
      </s.Container>
    </s.Screen>
  );
}


export default App;
