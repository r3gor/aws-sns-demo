
export const voteDataReducer = (state = {
    voteName: '',
    bandsQuantity: 0,
    bandsData: [],
}, action) => {
    
    const defaultBandData = {
        bandName: "",
        bandAlbumName: "",
        votes: 0,
    }

    switch( action.type ){
        
        case 'setVoteName':
            return { ...state, voteName: action.payload };
        
        case 'setBandsQuantity':

            const bandsQuantity = action.payload;

            let bandsData = state.bandsData;
            bandsData[bandsQuantity-1] = bandsData[bandsQuantity-1] || defaultBandData;

            bandsData = Array.from(
                bandsData, 
                data => data === undefined ? defaultBandData : data
            )

            return { ...state, bandsData, bandsQuantity: bandsQuantity };

        case 'setBandData':
            
            const { index, field, value } = action.payload

            const bandData = {
                ...state.bandsData[index],
                [field]: value,
            };

            const newBandsData = Object.assign(
                [], state.bandsData, {[index]: bandData});

            return { ...state, bandsData: newBandsData }
        
        default: 
            return state;
    }
}
