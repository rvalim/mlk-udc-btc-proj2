pragma solidity ^0.4.23;

import '../node_modules/openzeppelin-solidity/contracts/token/ERC721/ERC721.sol';

contract StarNotary is ERC721 { 

    struct Star { 
        string name;
        string dec;
        string mag;
        string cent;
        string story;
    }

    // mapping(uint256 => Star) _tokenToStarInfo;
    // mapping(bytes32 => uint256) _hashToTokenId;
    //Star[] public stars;    

    mapping(bytes32 => bool) _tokenExists;
    // mapping(bytes32 => uint256) _tokenToIndex;
    mapping(uint256 => uint256) public starsForSale;
    Star[] stars;
    // uint256[] _starsForSale;

    event createStarEvent(uint256 tokenId);

    function createStar(string _name, string _dec, string _mag, string _cent, string _story) 
    public
    {
        bytes32 starHash = _genHash(_dec, _mag, _cent);
        require(!_checkIfStarExist(starHash), "This coordinates has already been registered!");

        Star memory newStar = Star(_name, _dec, _mag, _cent, _story);
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
        require(_isApproved(msg.sender, _tokenId) == true, 'Only the owner or approved operators can sell this star!');

        starsForSale[_tokenId] = _price;

        // delete _starsForSale[_tokenId]; //Customize
        // _starsForSale.push(_tokenId); //Customize
    }

    function buyStar(uint256 _tokenId) public payable { 
        require(starsForSale[_tokenId] > 0, 'Star is not for sale');
        require(_canBuy(msg.sender, _tokenId) == true, 'The owner or his operators can\'t buy his own star!');
        
        uint256 starCost = starsForSale[_tokenId];
        address starOwner = this.ownerOf(_tokenId);
        require(msg.value >= starCost, 'Offered value is less than star\'s price');

        _removeTokenFrom(starOwner, _tokenId); //Original
        _addTokenTo(msg.sender, _tokenId); //Original
        // safeTransferFrom(starOwner, msg.sender, _tokenId);//Customize
        
        starOwner.transfer(starCost);

        if(msg.value > starCost) { 
            msg.sender.transfer(msg.value - starCost);
        }

        delete starsForSale[_tokenId];//Customize
        // delete _starsForSale[_tokenId];//Customize
    }
    
    function tokenIdToStarInfo(uint256 _tokenId) 
    public view
    //tokenIssued(_tokenId)
    returns(
        string name, 
        string dec, 
        string mag, 
        string cent,
        string story 
    ) {
        Star memory s = stars[_tokenId];
        return (s.name, s.dec, s.mag, s.cent, s.story);
    }

    function checkIfStarExist(string dec, string mag, string cent) 
    public view
    returns (bool) {
        bytes32 starHash = _genHash(dec, mag, cent);
        return (_checkIfStarExist(starHash));
    }
    
    function _checkIfStarExist(bytes32 starHash) 
    private view
    returns (bool) {
        return (_tokenExists[starHash]);
    }

    function _isApproved(address _operator, uint256 _tokenId) 
    private view 
    returns (bool isApproved) {
        address owner = this.ownerOf(_tokenId); 
        bool hasTokenApproval = getApproved(_tokenId) == _operator;
        bool isOwner = owner == _operator;
        isApproved = (isOwner || hasTokenApproval || isApprovedForAll(owner, _operator));
    }

    function _canBuy(address _operator, uint256 _tokenId) 
    private view 
    returns (bool canBuy) {
        canBuy = !_isApproved(_operator, _tokenId);
    }

    function _genHash(string dec, string mag, string cent) 
    private pure
    returns (bytes32) {
        return keccak256(abi.encodePacked(dec, mag, cent));
    }

}