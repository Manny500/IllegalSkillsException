package com.revature.domain;
import java.util.ArrayList;
import com.revature.domain.Lane;

public class LaneDTO {
    
    private ArrayList<Lane> lanes;
    private ArrayList<cardDTO> cards;
    private ArrayList<taskDTO> tasks;
    
    public LaneDTO(ArrayList<Lane> lanes, ArrayList<cardDTO> card, ArrayList<taskDTO> task) {
        super();
        this.lanes = lanes;
        this.cards = card;
        this.tasks = task;
    }
    public ArrayList<Lane> getLanes() {
        return lanes;
    }
    public void setLanes(ArrayList<Lane> lanes) {
        this.lanes = lanes;
    }
    public ArrayList<cardDTO> getCards() {
        return cards;
    }
    public void setCards(ArrayList<cardDTO> cards) {
        this.cards = cards;
    }
    public ArrayList<taskDTO> getTasks() {
        return tasks;
    }
    public void setTasks(ArrayList<taskDTO> tasks) {
        this.tasks = tasks;
    }
   
    
    
    
}