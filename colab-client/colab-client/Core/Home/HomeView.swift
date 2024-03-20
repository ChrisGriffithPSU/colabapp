//
//  ContentView.swift
//  colab-client
//
//  Created by Chris Griffith on 2/21/24.
//

import SwiftUI

struct HomeView: View {
    var body: some View {
        VStack(spacing: 48) {
            // Top Section
            VStack(alignment: .leading, spacing: 12) {
                HStack {
                    Image("search")
                    Spacer()
                    Image("profile")
                        .clipShape(Circle())
                        .frame(width: 36, height: 36)
                }
                
                Text("Feeling Creative Today, Chris?")
                    .font(Font.custom("KumbhSans-Regular_Bold", size: 24))
                    .foregroundStyle(.white)
            }
            .padding(.horizontal, 25)
            
            VStack(spacing: 20) {
                CardSection(title: "Your Colabs", showAll: true)
                CardSection(title: "Todays Top Colabs", showAll: false)
                CardSection(title: "Hall of Fame", showAll: true)
                
            }
        }
        .frame(maxWidth: .infinity, maxHeight: .infinity)
        .background(Color("background"))
    }
}

#Preview {
    HomeView()
}

struct CardSection: View {
    let title: String
    let showAll: Bool
    
    var body: some View {
        VStack(spacing: 16) {
            HStack(alignment: .bottom) {
                Text(title)
                    .foregroundStyle(.white)
                    .font(Font.custom("KumbhSans-Regular_SemiBold", size: 20))
                
                Spacer()
                
                if (showAll == true) {
                    Button {
                        
                    } label: {
                        Text("See all")
                            .foregroundStyle(.white)
                            .font(Font.custom("KumbhSans-Regular_SemiBold", size: 12))
                            .padding(.bottom, 2)
                    }
                    
                }
                
            }
            .padding(.horizontal, 25)
            
            ScrollView(.horizontal, showsIndicators: false) {
                HStack(spacing: 16) {
                    ForEach(0 ..< 5, id: \.self) { data in
                        DetailsComponent()
                    }
                }
            }
            .padding(.leading, 25)
        }
    }
}
