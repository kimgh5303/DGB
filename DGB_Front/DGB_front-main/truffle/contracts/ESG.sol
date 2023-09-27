// SPDX-License-Identifier: MIT 
pragma solidity ^0.8.13;

import "./OpenZeppelin/Utils/Counters.sol";
import "./OpenZeppelin/NFT/ERC721URIStorage.sol";
import "./OpenZeppelin/Access/Ownable.sol";

contract ESG is ERC721URIStorage, Ownable{

    using Counters for Counters.Counter;
    Counters.Counter internal _tokenIds;
    address contractAddress;

    event Mint(uint256 tokenId, string tokenURI);
    

    constructor()
        ERC721("DGB", "don") Ownable()
    {
    }

    function mint(string memory tokenURI) public onlyOwner returns (uint256) {
        _tokenIds.increment();
        uint256 newReportId = _tokenIds.current();

        _mint(msg.sender, newReportId);
        _setTokenURI(newReportId, tokenURI);
        setApprovalForAll(contractAddress, true);

        emit Mint(newReportId, tokenURI);

        return newReportId;
    }

    function burn(uint256 tokenId) public {
        //solhint-disable-next-line max-line-length
        require(_isApprovedOrOwner(_msgSender(), tokenId), "ERC721Burnable: caller is not owner nor approved");
        _burn(tokenId);
    }
}
