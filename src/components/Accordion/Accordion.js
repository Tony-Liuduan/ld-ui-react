import React from 'react';
import './Accordion.scss';
class AccordionPanel extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            open: false,
            class: "accordion-panel"
        }
    }

    handleClick = (e) => {
        if(this.state.open) {
            this.setState({
                open: false,
                class: "accordion-panel"
            });
        }else{
            this.setState({
                open: true,
                class: "accordion-panel open"
            });
        }
    }
    render () {
        return (
            <div className={this.state.class}>
                <button>toggle</button>
                <div className="accordion-panel-head" onClick={this.handleClick}>{this.props.title}</div>
                <div className="accordion-panel-articlewrap">
                    <div className="article">
                        {this.props.children}
                    </div>
                </div>
            </div>
        );
    }
}

class Accordion extends React.Component {
    render() {
        return (
            <div className="main">
                <div className="title">{this.props.title}</div>
                <AccordionPanel title="Section Title One">   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nemo harum voluptas aliquid rem possimus nostrum excepturi!
                </AccordionPanel>
                <AccordionPanel title="Section Title Two">   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nemo harum voluptas aliquid rem possimus nostrum excepturi!
                </AccordionPanel>
                <AccordionPanel title="Section Title Three">   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Amet nemo harum voluptas aliquid rem possimus nostrum excepturi!
                </AccordionPanel>
            </div>
        )
    }
}

export default Accordion;