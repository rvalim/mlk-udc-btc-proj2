pragma solidity ^0.4.23;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';
// import './StringLib.sol';

contract StarNotary is ERC721 { 

    struct Star { 
        string name;
        string story;
        string ra;
        string dec;
        string mag;
    }

    mapping(bytes32 => bool) _tokenExists;
    mapping(uint256 => uint256) public starsForSale;
    Star[] stars;

    event createStarEvent(uint256 tokenId);

    function createStar(string _name, string _ra, string _dec, string _mag, string _story) 
    public
    {
        bytes32 starHash = _genHash(_ra, _dec, _mag);
        require(!_checkIfStarExist(starHash), "This coordinates has already been registered!");

        Star memory newStar = Star(_name, _story, _ra, _dec, _mag);
        uint256 tokenId = stars.push(newStar) - 1;

        // _tokenToIndex[starHash] = tokenId;
        _tokenExists[starHash] = true;

        mint(msg.sender, tokenId);

        emit createStarEvent(tokenId);
    }

    function mint(address _to, uint256 _tokenId) public {
        _mint(_to, _tokenId);
    }

    function putStarUpForSale(uint256 _tokenId, uint256 _price) public { 
        require(_isApprovedOrOwner(msg.sender, _tokenId) == true, 'Only the owner or approved operators can sell this star!');

        starsForSale[_tokenId] = _price;
    }

    function buyStar(uint256 _tokenId) public payable { 
        require(_canBuy(_tokenId) == true, 'You can not buy this star!');
    
        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost, 'Offered value is less than star\'s price');

        safeTransferFrom(starOwner, msg.sender, _tokenId);//Customize
        
        // _removeTokenFrom(starOwner, _tokenId); //Original
        // _addTokenTo(msg.sender, _tokenId); //Original
        // starOwner.transfer(starCost);

        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }

        delete starsForSale[_tokenId];//Customize
    }
    
    function tokenIdToStarInfo(uint256 _tokenId) 
    public view
    returns(
        string name, 
        string story, 
        string ra,
        string dec, 
        string mag 
    ) {
        Star memory s = stars[_tokenId];
        name = s.name;
        story = s.story;
        dec = string(abi.encodePacked('dec_', s.dec));
        mag = string(abi.encodePacked('mag_', s.mag));
        ra = string(abi.encodePacked('ra_', s.ra));
    }

    function checkIfStarExist(string ra, string dec, string mag) 
    public view
    returns (bool) {
        bytes32 starHash = _genHash(ra, dec, mag);
        return (_checkIfStarExist(starHash));
    }
    
    function _checkIfStarExist(bytes32 starHash) 
    private view
    returns (bool) {
        return (_tokenExists[starHash]);
    }

    function _canBuy(uint256 _tokenId) 
    private view 
    returns (bool canBuy) {
        require(starsForSale[_tokenId] > 0, 'Star is not for sale');

        address owner = this.ownerOf(_tokenId); 
        canBuy = (msg.sender != owner || getApproved(_tokenId) == msg.sender);
    }

    function _genHash(string ra, string dec, string mag) 
    private pure
    returns (bytes32) {
        return keccak256(abi.encodePacked(ra, dec, mag));
    }

}