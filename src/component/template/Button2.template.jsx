
import React from 'react'; 
import { Button } from 'primereact/button';

export default function Button2(props) {
    const { 
      onClick, 
      title, 
      data, 
      danger,
      success,
      link,
      className
    } = props
    

    const handleClick = () => {
      if (typeof onClick === 'function') {
        onClick();
      }
    };
      



    return (
        <Button 
          label={title}
          link={link}
          severity={(danger && 'danger') || (success && 'success')}
          onClick={handleClick} 
          className={className}
        />

    )
}