import { useAuth, useUser } from '@clerk/clerk-expo';
import { StyleSheet, ScrollView, Text, TextInput, View, Image, ImageSourcePropType, Pressable } from "react-native";

// Componente reutilizável para renderizar categorias
interface CategoryGroupProps {
  title: string;
  isActive?: boolean; // Definido como opcional com um valor padrão
}

const CategoryGroup: React.FC<CategoryGroupProps> = ({ title, isActive = false }) => (
  <View style={isActive ? styles.CategoryGroupActive : styles.CategoryGroup}>
    <Image style={styles.CategoryGroupImage} />
    <Text style={styles.CategoryGroupTitle}>{title}</Text>
  </View>
);

// Componente reutilizável para renderizar restaurantes
interface RestaurantItemProps {
  // image: ImageSourcePropType;  // Tipo adequado para imagens
  title: string;
  tags: string;
  rating: string;
  deliveryTime: string;
  price: string;
}

const RestaurantItem: React.FC<RestaurantItemProps> = ({ title, tags, rating, deliveryTime, price }) => (
  <View style={styles.RestaurantItem}>
    <Image style={styles.RestaurantImage} />
    <Text style={styles.RestaurantTitle}>{title}</Text>
    <Text style={styles.RestaurantTags}>{tags}</Text>
    <View style={styles.ReviewSection}>
      <View style={styles.Review}>
        <Image source={require('@/assets/images/Star.svg')} style={styles.ReviewImage} />
        <Text style={styles.ReviewTitleStar}>{rating}</Text>
      </View>
      <View style={styles.Review}>
        <Image source={require('@/assets/images/Star.svg')} style={styles.ReviewImage} />
        <Text style={styles.ReviewTitle}>{price}</Text>
      </View>
      <View style={styles.Review}>
        <Image source={require('@/assets/images/Star.svg')} style={styles.ReviewImage} />
        <Text style={styles.ReviewTitle}>{deliveryTime}</Text>
      </View>
    </View>
  </View>
);

export default function Index() {
  const { signOut } = useAuth();
  const { user } = useUser();

  return (
    <ScrollView style={styles.Content}>
      <View style={styles.Header}>
        <View style={styles.HeaderSection}>
          <Pressable style={styles.Menu} onPress={() => { signOut(); }}>
            <Image source={require('@/assets/images/Menu.svg')} />
          </Pressable>
          <View style={styles.GroupHeader}>
            <Text style={styles.GroupHeaderTitle}>Deliver to</Text>
            <Pressable style={styles.Dropdown}>
              <Text style={styles.GroupHeaderDescription}>Home <Image source={require('@/assets/images/arrow-bottom.svg')} /></Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.Cart}>
          <View style={styles.CartNumber}>
            <Text style={styles.CartNumberText}>2</Text>
          </View>
          <Image source={require('@/assets/images/Cart.svg')}/>
        </View>
      </View>

      <View style={styles.Main}>
        <View style={styles.Section}>
          <Text style={styles.TextUser}>Hello <Text style={styles.Name}>{user?.fullName}!</Text></Text>
        </View>

        <View style={styles.Search}>
          <Image style={styles.SearchImage} source={require('@/assets/images/Search.svg')} />
          <TextInput style={styles.SearchText} placeholder="Search dishes, restaurants" />
        </View>

        {/* Seção de categorias */}
        <View style={styles.CategoryAll}>
          <View style={styles.SectionCategory}>
            <Text style={styles.CategoryTitle}>All Categories</Text>
            <View style={styles.CategorySee}>
              <Text style={styles.CategorySeeText}>See All</Text>
              <Image style={styles.CategorySeeImage} source={require('@/assets/images/arrow-right.svg')} />
            </View>
          </View>
          <ScrollView horizontal={true}>
            <CategoryGroup title="All" isActive={true} />
            <CategoryGroup title="Hot Dog" />
            <CategoryGroup title="Burger" />
            <CategoryGroup title="Pizza" />
          </ScrollView>
        </View>

        {/* Seção de restaurantes */}
        <View style={styles.SectionCategory}>
          <Text style={styles.CategoryTitle}>Open Restaurants</Text>
          <View style={styles.CategorySee}>
            <Text style={styles.CategorySeeText}>See All</Text>
            <Image style={styles.CategorySeeImage} source={require('@/assets/images/arrow-right.svg')} />
          </View>
        </View>

        {/* Listagem de restaurantes */}
        <RestaurantItem
          // image={require('@/assets/images/restaurant1.jpg')}
          title="Rose Garden Restaurant"
          tags="Burger - Chicken - Rice - Wings"
          rating="4.9"
          price="Free"
          deliveryTime="10 min"
        />
        <RestaurantItem
          // image={require('@/assets/images/restaurant2.jpg')}
          title="Rose Garden Restaurant"
          tags="Burger - Chicken - Rice - Wings"
          rating="4.9"
          price="Free"
          deliveryTime="20 min"
        />
        <RestaurantItem
          // image={require('@/assets/images/restaurant2.jpg')}
          title="Rose Garden Restaurant"
          tags="Burger - Chicken - Rice - Wings"
          rating="4.7"
          price="Free"
          deliveryTime="30 min"
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Content: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 32,
  },
  Header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  HeaderSection: {
    flexDirection: 'row',
  },
  Menu: {
    backgroundColor: '#ECF0F4',
    borderRadius: 50,
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Cart: {
    backgroundColor: '#181C2E',
    borderRadius: '50%',
    width: 45,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  CartNumber: {
    backgroundColor: '#FF7622',
    borderRadius: '50%',
    width: 25,
    height: 25,
    position: 'absolute',
    top: -10,
    left: 25,
    justifyContent: 'center',
  },
  CartNumberText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Sen-Bold',
    textAlign: 'center',
  },
  GroupHeader: {
    flexDirection: 'column',
    marginLeft: 16,
    justifyContent: 'center',
  },
  Dropdown: {
    justifyContent: 'center',
  },
  GroupHeaderTitle: {
    color: '#FC6E2A',
    fontSize: 12,
    fontFamily: 'Sen-Bold',
    textTransform: 'uppercase',
  },
  GroupHeaderDescription: {
    color: '#676767',
    fontSize: 14,
    fontFamily: 'Sen-Regular',
  },
  Main: {
    marginTop: 16,
    flexDirection: 'column',
  },
  Section: {
    flexDirection: 'row',
  },
  TextUser: {
    color: '#1E1D1D',
    fontSize: 16,
    fontFamily: 'Sen-Regular',
  },
  Name: {
    color: '#1E1D1D',
    fontSize: 16,
    fontFamily: 'Sen-Bold',
  },
  Search: {
    flexDirection: 'row',
    marginTop: 16,
    backgroundColor: '#F6F6F6',
    borderRadius: 10,
    width: '100%',
    height: 62,
    paddingLeft: 18,
  },
  SearchImage: {
    margin: 'auto',
    marginRight: 8,
  },
  SearchText: {
    color: '#676767',
    fontSize: 14,
    fontFamily: 'Sen-Regular',
    width: '100%',
  },
  CategoryAll: {
    marginTop: 28,
    height: 110,
    flexDirection: 'column',
    marginBottom: 16,
  },
  SectionCategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  CategoryTitle: {
    color: '#32343E',
    fontSize: 20,
    fontFamily: 'Sen-Regular',
  },
  CategorySee: {
    flexDirection: 'row',
    gap: 16,
  },
  CategorySeeText: {
    color: '#333333',
    fontSize: 16,
    fontFamily: 'Sen-Regular',
    margin: 'auto',
  },
  CategorySeeImage: {
    margin: 'auto',
  },
  CategoryGroup: {
    marginTop: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 50,
    boxShadow: '1px 1px 25px -17px rgba(0,0,0,0.75)',
    width: 135,
    height: 60,
    flexDirection: 'row',
    marginRight: 28,
  },
  CategoryGroupActive: {
    marginTop: 16,
    backgroundColor: '#FFD27C',
    borderRadius: 50,
    boxShadow: '1px 1px 25px -17px rgba(0,0,0,0.75)',
    width: 135,
    height: 60,
    flexDirection: 'row',
    marginRight: 28,
  },
  CategoryGroupImage: {
    marginLeft: 6,
    backgroundColor: '#98A8B8',
    borderRadius: 23,
    width: 44,
    height: 44,
    margin: 'auto',
    marginRight: 0,
  },
  CategoryGroupTitle: {
    margin: 'auto',
    fontSize: 14,
    fontFamily: 'Sen-Bold',
  },
  RestaurantItem: {
    marginTop: 16,
    marginBottom: 16,
    flexDirection: 'column',
  },
  RestaurantImage: {
    width: 327,
    height: 137,
    backgroundColor: '#98A8B8',
    borderRadius: 10,
  },
  RestaurantTitle: {
    marginTop: 10,
    color: '#181C2E',
    fontFamily: 'Sen-Regular',
    fontSize: 20,
  },
  RestaurantTags: {
    marginTop: 5,
    color: '#A0A5BA',
    fontSize: 14,
    fontFamily: 'Sen-Regular',
  },
  ReviewSection: {
    marginTop: 7,
    flexDirection: 'row',
    gap: 16,
  },
  Review: {
    flexDirection: 'row',
  },
  ReviewTitle: {
    color: '#181C2E',
    fontFamily: 'Sen-Regular',
    fontSize: 14,
    margin: 'auto',
    marginLeft: 5,
  },
  ReviewTitleStar: {
    color: '#181C2E',
    fontFamily: 'Sen-Bold',
    fontSize: 16,
    margin: 'auto',
    marginLeft: 5,
  },
  ReviewImage: {
    width: 20,
    height: 20,
    margin: 'auto',
  },
});