
import React, { MouseEvent, MouseEventHandler} from "react";

type Props  = {
  
}

const PlanetOverviewTable: React.FC<Props> = () => {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
            <div>
                <label htmlFor="planetnameInput">Planet Name:</label>
            </div>
            <div>
                <input id='planetnameInput' type="text" value={planetname} onChange={(event)=>setName(event.target.value)}/>
                {nameError && <div>{nameError}</div>}
            </div>
        </div>
        <div>
            <button type='submit'>
                Add Planet
            </button>
        </div>
      </form>
    </>
  );
};


export default PlanetOverviewTable;