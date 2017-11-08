package com.revature.domain;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "CHART")
public class Chart {

	@Id
	@Column(name = "CHART_ID")
	private int chartId;

	@Column(name = "CHART_SUM")
	private int chartSum;

	@JsonIgnore
	@ManyToOne
	@JoinColumn(name = "B_ID")
	Board chartBoard;

	@Column(name = "CHART_DATE")
	private String chartDate;

	public Chart() {

	}

	public Chart(int chartId, int chartSum, Board chartBoard, String chartDate) {
		super();
		this.chartId = chartId;
		this.chartSum = chartSum;
		this.chartBoard = chartBoard;
		this.chartDate = chartDate;
	}

	public int getChartId() {
		return chartId;
	}

	public void setChartId(int chartId) {
		this.chartId = chartId;
	}

	public int getChartSum() {
		return chartSum;
	}

	public void setChartSum(int chartSum) {
		this.chartSum = chartSum;
	}

	public Board getChartBoard() {
		return chartBoard;
	}

	public void setChartBoard(Board chartBoard) {
		this.chartBoard = chartBoard;
	}

	public String getChartDate() {
		return chartDate;
	}

	public void setChartDate(String chartDate) {
		this.chartDate = chartDate;
	}

}